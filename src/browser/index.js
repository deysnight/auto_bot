import puppeteer from 'puppeteer'

class Browser {
    async init() {
        //this.browser = await puppeteer.launch({ headless: false })
        this.browser = await puppeteer.launch({
            defaultViewport: {
                width: 1280,
                height: 720,
                deviceScaleFactor: 1,
            },
        })
        this.page = await this.browser.newPage()

        /*await this.page.setViewport({
            width: 1280,
            height: 720,
            deviceScaleFactor: 1,
        })*/

        await this.page.goto('https://www.google.com/')
    }

    async test() {
        await this.page.goto('https://faucetcrypto.com/dashboard')
        //await this.page.screenshot({ path: 'test.png' })
        let tmp = await this.page.screenshot()
        console.log(tmp)
    }
}

export default new Browser()
