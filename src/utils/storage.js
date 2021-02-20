export default class Storage {
    constructor() {


        // config
        this.emptyconfig = {
            freefaucet: {
                enabled: false,
                login: "",
                password: ""
            },
            faucetcrypto: {
                enabled: false,
                login: "",
                password: ""
            },
            publish0x: {
                enabled: false,
                login: "",
                password: ""
            }
        }


        // data
        this.emptydata = {
            freefaucet: {
                usdt: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                usdc: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                bnb: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                btc: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                eth: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                ada: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                trx: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                dash: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                xrp: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                xem: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                steam: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                ltc: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                link: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
                neo: { claimcount: 0, balance: 0.0, lastclaim: 0.0, lastDone: 0 },
            },
            faucetcrypto: {
                ptccount: 0, shortlinkcount: 0, balance: 0.0, lastDone: 0
            },

        }

        // ff = freefaucet
        this.ff_currencies = [
            'usdt',
            'usdc',
            'bnb',
            'btc',
            'eth',
            'ada',
            'trx',
            'dash',
            'xrp',
            'xem',
            'steam',
            'ltc',
            'link',
            'neo'
        ]

        this.ff_data = {
            usdt: { url: 'https://freetether.com/free', lastDone: 0 },
            usdc: { url: 'https://freeusdcoin.com/free', lastDone: 0 },
            bnb: { url: 'https://freebinancecoin.com/free', lastDone: 0 },
            btc: { url: 'https://freebitcoin.io/free', lastDone: 0 },
            eth: { url: 'https://freeethereum.com/free', lastDone: 0 },
            ada: { url: 'https://freecardano.com/free', lastDone: 0 },
            trx: { url: 'https://free-tron.com/free', lastDone: 0 },
            dash: { url: 'https://freedash.io/free', lastDone: 0 },
            xrp: { url: 'https://coinfaucet.io/free', lastDone: 0 },
            xem: { url: 'https://freenem.com/free', lastDone: 0 },
            steam: { url: 'https://freesteam.io/free', lastDone: 0 },
            ltc: { url: 'https://free-ltc.com/free', lastDone: 0 },
            link: { url: 'https://freechainlink.io/free', lastDone: 0 },
            neo: { url: 'https://freeneo.io/free', lastDone: 0 },
        }

        // fc = faucetcrypto
        this.fc_data = {
            url: 'https://faucetcrypto.com/dashboard',
            lastDone: 0,
        }

    }


    ff_checkTimeout = (currency, timeout) => {
        const now = Date.now()
        const last = this.ff_data[currency].lastDone
        if (now - last > timeout * 1000) {
            return true
        }
        return false
    }

    ff_update_last = (currency) => {
        this.ff_data[currency].lastDone = Date.now()
    }


    fc_checkTimeout = (timeout) => {
        const now = Date.now()
        const last = this.fc_data.lastDone
        if (now - last > timeout * 1000) {
            return true
        }
        return false
    }


    // fonction get most recent
    // get ff or fc
    // etc
}
