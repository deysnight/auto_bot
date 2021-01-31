import puppeteer from 'puppeteer'
import cv from 'opencv4nodejs'

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
        await this.page.goto('https://www.google.com/')
    }

    async test() {
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
    }
}

export default new Browser()
