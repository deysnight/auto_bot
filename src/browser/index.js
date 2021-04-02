import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import path from 'path'
//import cv from 'opencv4nodejs'

class Browser {
    async init() {
        puppeteer.use(StealthPlugin())
        this.browser = await puppeteer.launch({
            defaultViewport: {
                width: 1280,
                height: 720,
                deviceScaleFactor: 1,
            },
            args: ['--no-sandbox'],
            userDataDir: 'E:\\Documents\\repo_git\\auto_bot\\puppeteer_autobot',
            headless: false
        })

        this.page = await (await this.browser.pages())[0]

        /*this.browser.on("targetcreated", async (target)=>{
            const page=await target.page();
            if(page) page.close();
         });*/

         
        //this.page = await this.browser.newPage()

        await this.page.setRequestInterception(true);

        const blockedDomains = [
            'cdn.mgid.com',
            'cm.mgid.com',
            'c.mgid.com',
            'jsc.mgid.com',
            's-img.mgid.com',
            'www.googletagmanager.com',
            'exoprsdds.com',
            'cdn.bmcdn1.com',
            'ad.a-ads.com',
            'static.a-ads.com/',
            'cdn.adclerks.com',
            'ads.addragon.com',
            'jsc.mgid.com',
            'viewm.moonicorn.network',
            'coinzillatag.com',
            'ppfrlfe.com',
            'assets.revcontent.com',
            'trtjigpsscmv9epe10.com',
            'ad.bitmedia.io',
          ];

        this.page.on('request', interceptedRequest => {
            //console.log(new URL(interceptedRequest.url()).host)
            if (blockedDomains.includes(new URL(interceptedRequest.url()).host)) {
                interceptedRequest.abort()
            } else {
                interceptedRequest.continue()
            }
        })


        await this.page.goto('https://www.google.com/')
    }

    /*async test() {
        await this.page.goto('https://faucetcrypto.com/dashboard')
        //await this.page.screenshot({ path: 'test.png' })

        console.time('tmp1')
        let tmp1 = await this.page.screenshot({ encoding: 'base64' })
        const buffer1 = Buffer.from(tmp1, 'base64')
        const img1 = cv.imdecode(buffer1)
        console.timeEnd('tmp1')

        console.time('tmp2')
        let tmp2 = await this.page.screenshot()
        const img2 = cv.imdecode(tmp2)
        console.timeEnd('tmp2')

        cv.imshow('a img1 name', img1)
        cv.imshow('a img2 name', img2)
        cv.waitKey()
    }*/
}

export default new Browser()
