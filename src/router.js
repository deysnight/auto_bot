import { Router } from 'express'

export default function initRouter() {
    const router = Router()

    router.get('/', async (req, res) => {
        return res.status(200).json({ success: true })
    })

    return router
}
