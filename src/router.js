import { Router } from 'express'
import path from 'path'

export default function initRouter() {
    const router = Router()
    const static_path = "/www"

    router.get('/', (req, res) => {
        res.sendFile(path.join(process.cwd() + static_path + '/dashboard.html'));
    })

    router.get('/config', (req, res) => {
        res.sendFile(path.join(process.cwd() + static_path + '/config.html'));
    })

    router.get('/data', (req, res) => {
        try {
            const cur_list = req.app.locals.scheduler.storage.ff_currencies
            const cur_data = req.app.locals.scheduler.data
            return res.status(200).json({ success: true, list: cur_list, data: cur_data })
        } catch (e) {
            return res.status(500).json({ success: false, msg: e.message })
        }
    })

    router.get('/cfg', (req, res) => {
        try {
            const cur_cfg = req.app.locals.scheduler.config
            return res.status(200).json({ success: true, config: Buffer.from(JSON.stringify(cur_cfg)).toString('base64') })
        } catch (e) {
            return res.status(500).json({ success: false, msg: e.message })
        }
    })

    router.post('/cfg', (req, res) => {
        try {
            
            let new_config = JSON.parse(Buffer.from(req.body.data, 'base64').toString('ascii'));
            req.app.locals.scheduler.update_config(new_config)
            
            return res.status(200).json({ success: true })
        } catch (e) {
            return res.status(500).json({ success: false, msg: e.message })
        }
    })


    router.get('/start', (req, res) => {
        try {
            return res.status(200).json({ success: true, state: req.app.locals.scheduler.runtime })
        } catch (e) {
            return res.status(500).json({ success: false, msg: e.message })
        }
    })

    router.post('/start', (req, res) => {
        try {
            req.app.locals.scheduler.switch_state(req.body.state)
            return res.status(200).json({ success: true })
        } catch (e) {
            return res.status(500).json({ success: false, msg: e.message })
        }
    })

    return router
}
