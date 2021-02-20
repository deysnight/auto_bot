import express from 'express'

import router from '../../router'

export default function (expressApp) {
    expressApp.use(express.json())
    expressApp.use(express.urlencoded())

    expressApp.use(express.static('static'));

    expressApp.use('*', (req, res, next) => {
        /*res.header(
            'Access-Control-Allow-Methods',
            'PUT, GET, POST, DELETE, OPTIONS, PATCH'
        )*/
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, X-Correlation-ID, Content-Type, Accept'
        )

        if (req.method === 'OPTIONS') {
            return res.sendStatus(200).end()
        }

        return next()
    })

    expressApp.use('/', router())

    return expressApp
}
