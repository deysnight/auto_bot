//import sleep from './utils/sleep'
import { sleep, toFixedNumber, randomInt } from './utils/utils'
import Storage from './utils/storage'
import url from "url"
import fs from "fs"

export default class Scheduler {
    constructor(browser) {
        this.browser = browser
        this.runtime = false
        this.storage = new Storage()
        this.data = {... this.storage.emptydata}
        this.config = {... this.storage.emptyconfig}
    }

    save_state = async () => {
        fs.writeFile(process.env.DATAFILE, JSON.stringify(this.data), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }

    update_config = (new_config) => {
        this.config = {... new_config}
        fs.writeFile(process.env.CONFFILE, JSON.stringify(new_config), function writeJSON(err) {
            if (err) return console.log(err);
        });
    }

    switch_state = (new_state) => {
        if (new_state === 'true') {
            this.runtime = true
        }
        else {
            this.runtime = false
        }
    }

    startup = async () => {
        
        if (fs.existsSync(process.env.DATAFILE) === false) {
            fs.writeFileSync(process.env.DATAFILE, JSON.stringify(this.data));
        }
        else {
            this.data = { ... JSON.parse(fs.readFileSync(process.env.DATAFILE)) };
            for (const currency of this.storage.ff_currencies) {
                this.storage.ff_data[currency].lastDone = this.data.freefaucet[currency].lastDone
            }
        }

        if (fs.existsSync(process.env.CONFFILE) === false) {
            fs.writeFileSync(process.env.CONFFILE, JSON.stringify(this.config));
        }
        else {
            this.config = { ... JSON.parse(fs.readFileSync(process.env.CONFFILE)) };
        }


        while (1) {
            console.log("runtime: ", this.runtime)
            if (this.runtime === true) {
                

                if (this.config.freefaucet.enabled == true) {
                    for (const currency of this.storage.ff_currencies) {
                        if (this.storage.ff_checkTimeout(currency, 60 * 60) == true) {
                            try {
                                await this.free_faucet_loop(currency)
                            } catch (e) {
                                console.log("got error")
                                console.log(e)
                            }
                            //break;
                        }
                    }
                }


                if (this.config.faucetcrypto.enabled == true) {
                    if (this.storage.fc_checkTimeout(60 * 60) == true) {
                        try {
                            await this.faucet_crypto_loop()
                        } catch (e) {
                            console.log("got error")
                            console.log(e)
                        }
                        //break;
                    }
                }
               
                await sleep(5000)
            } else if (this.runtime === false) {
                await sleep(5000)
            }
        }
    }


    free_faucet_loop = async (currency) => {
        
        //goto URL
        await this.browser.page.goto(this.storage.ff_data[currency].url)
        await sleep(2000)

        //check if logged
        const pathname =  new url.URL(this.browser.page.url()).pathname;
        if (pathname.indexOf("free") === -1) {
            //need to loggin

            //try to close tuto window a start
            try {
                await this.browser.page.click('.d-none.d-lg-block > div:nth-child(1)');
                await sleep(1000)
            } catch (error) {
                //PASS
            }


            //mail
            await this.browser.page.type('.form-control.email', this.config.freefaucet.login);
            //password
            await this.browser.page.type('.form-control.password', this.config.freefaucet.password);
            //click on log in
            await this.browser.page.click('.main-button.main-button-yellow.login.bg-3');
            await this.browser.page.waitForNavigation();
            await sleep(3000)
        }

        //check balance
        const balance = await this.browser.page.$eval('.navbar-coins.bg-1', (divs) => {
            return parseFloat(divs.children[0].innerText.split(' ')[0]);
        });


        //check if claim available
        const isClaimable = await this.browser.page.$eval('.timeout-wrapper', (divs) => {
            return divs.style.display;
        });
        if (isClaimable == "none") {
            console.log("claim")
            await this.browser.page.click('.main-button-2.roll-button.bg-2')

            await sleep(4000)

            const new_balance = await this.browser.page.$eval('.navbar-coins.bg-1', (divs) => {
                return parseFloat(divs.children[0].innerText.split(' ')[0]);
            });
            //update lastDone
            this.storage.ff_update_last(currency)
            this.data.freefaucet[currency].claimcount += 1
            this.data.freefaucet[currency].balance = new_balance
            this.data.freefaucet[currency].lastclaim = (new_balance - balance)
            this.data.freefaucet[currency].lastDone = Date.now()
            this.save_state()
        }
        else {
            console.log("not claimable")
        }
    }


    faucet_crypto_loop = async () => {
        //goto URL
        await this.browser.page.goto(this.storage.fc_data.url)
        await sleep(2000)

        //check if logged
        const pathname =  new url.URL(this.browser.page.url()).pathname;
        if (pathname.indexOf("dashboard") === -1) {
            //need to loggin

            //mail
            await this.browser.page.type('.mb-4 > .mt-1.relative.rounded-md.shadow-sm > input', this.config.faucetcrypto.login);
            //password
            await this.browser.page.type('.mb-6 > .mt-1.relative.rounded-md.shadow-sm > input', this.config.faucetcrypto.password);
            //click on log in
            await this.browser.page.click('.w-full.inline-flex.rounded-md.shadow > button');
            await this.browser.page.waitForNavigation();
            await sleep(3000)

            //try to close tuto window a start
            try {
                await this.browser.page.click('.inline-flex.rounded-md.shadow-sm:nth-child(1) > button');
                await sleep(3000)
            } catch (error) {
                //PASS
            }

            //try to close chat window
            try {
                await this.browser.page.click('.chatbro_header_button.chatbro_minimize_button');
                await sleep(3000)
            } catch (error) {
                //PASS
            }
        }


        //get current balance
        let current_balance = await this.browser.page.$eval('.flex.badge.text-bg-yellow.py-1.transition.duration-150.ease-in-out', (divs) => {
            return parseFloat(divs.innerText.split(' ')[0]);
        });
        this.data.faucetcrypto.currentbalance = current_balance
        await sleep(500)


        //check if ptc available
        const available_ptc = await this.browser.page.$eval('.px-2.py-4.space-y-1.w-full.relative', (divs) => {
            return (divs.children[1].children[2].children.length > 1 ? true : false);
        });
        await sleep(1000)

        //START PTC
        if (available_ptc == true) {
            //goto ptc page
            await this.browser.page.click('.px-2.py-4.space-y-1.w-full.relative > div:nth-child(2) > a:nth-child(3)');
            await sleep(5000)

            const nb_ptc_available = await this.browser.page.$eval('.grid.grid-responsive-3', (divs) => {
                return parseFloat(divs.children.length);
            });


            let nb_ptc_remaining = nb_ptc_available;
            do {
                //get ptc timer
                let timer_for_ptc = await this.browser.page.$eval('.grid.grid-responsive-3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)', (divs) => {
                    return parseFloat(divs.innerText.split(' ')[0]);
                });

                //get ptc reward
                let ptc_reward = await this.browser.page.$eval('.grid.grid-responsive-3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)', (divs) => {
                    return parseFloat(divs.innerText.split(' ')[0]);
                });

                //click on ptc
                await this.browser.page.click('.grid.grid-responsive-3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span > a');
                await this.browser.page.waitForNavigation();
                await sleep(5000)

                //ptc interpage
                console.log("1")
                await this.browser.page.waitForFunction("document.querySelector('.flex.justify-center.my-6 > div:nth-child(1) > span:nth-child(1) > button:nth-child(2)').classList.contains('cursor-not-allowed') == false")
                console.log("2")
                await sleep(randomInt(2,7) * 1000)
                await this.browser.page.click('.flex.justify-center.my-6 > div:nth-child(1) > span:nth-child(1) > button:nth-child(2)');
                console.log("3")
                //'.flex.justify-center.my-6 > span:nth-child(2) > button'

                //wait for timer
                await sleep((randomInt(3, 10) + timer_for_ptc) * 1000)

                //click on continue
                await this.browser.page.click('.notranslate.inline-flex.rounded-md.shadow-sm > a');
                await this.browser.page.waitForNavigation();
                await sleep(5000)

                const list_page = await this.browser.browser.pages()
                const current_page = list_page[list_page.length - 1]
                const current_url = current_page.url()
                if (new URL(current_url).host != 'faucetcrypto.com') {
                    await current_page.goto('about:blank')
                    await sleep(5000)
                    await current_page.close();
                }
                await sleep(5000)

                //get new balance
                const new_current_balance = await this.browser.page.$eval('.flex.badge.text-bg-yellow.py-1.transition.duration-150.ease-in-out', (divs) => {
                    return parseFloat(divs.innerText.split(' ')[0]);
                });
                const old_nb_ptc_remaining = nb_ptc_remaining


                nb_ptc_remaining = await this.browser.page.$eval('.grid.grid-responsive-3', (divs) => {
                    return parseFloat(divs.children.length);
                });

                // if ptc succed
                console.log("old_nb_ptc_remaining", old_nb_ptc_remaining)
                console.log("nb_ptc_remaining", nb_ptc_remaining)
                if (old_nb_ptc_remaining != nb_ptc_remaining) {
                    this.data.faucetcrypto.currentbalance = new_current_balance
                    this.data.faucetcrypto.ptc.claimcount += 1
                    this.data.faucetcrypto.ptc.totalearn += ptc_reward
                    if (!(nb_ptc_remaining > 0)) {
                        this.data.faucetcrypto.ptc.lastDone = Date.now()
                        this.storage.fc_update_last("ptc")
                    }
                    this.save_state()
                }
                
            } while (nb_ptc_remaining > 0)
        }
        //END PTC

        //check if shortline available
        const available_shortlink = await this.browser.page.$eval('.px-2.py-4.space-y-1.w-full.relative > div:nth-child(2) > a:nth-child(4) > span:nth-child(2)', (divs) => {
            return (divs.innerText > 2 ? true : false);
        });
        await sleep(1000)

        //START PTC
        if (available_shortlink == true) {
            console.log("shortlink")
        }

        
        this.runtime = false
    }

}
