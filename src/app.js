import 'dotenv/config'
import express from 'express'

import expressConfig from './config/express'
import Browser from './browser'

async function App() {
    const expressApp_base = express()

    try {
        console.log(`[${process.env.APP_NAME}] is starting`)

        const expressApp = expressConfig(expressApp_base)

        expressApp.locals.browser = Browser
        await expressApp.locals.browser.init()

        await expressApp.locals.browser.test()

        expressApp.listen(process.env.port, () =>
            console.log(
                `[Server] ${process.env.APP_NAME} listening on ${process.env.PORT} in ${process.env.MODE} mode`
            )
        )
    } catch (e) {
        console.log(e)
    }
}

export default App()
