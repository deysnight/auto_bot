export default class Storage {
    constructor() {
        //ff = freefaucet
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
        ]

        this.ff_data = {
            usdt: { url: 'https://freetether.com/', lastDone: 0 },
            usdc: { url: 'https://freeusdcoin.com/', lastDone: 0 },
            bnb: { url: 'https://freebinancecoin.com/', lastDone: 0 },
            btc: { url: 'https://freebitcoin.io/', lastDone: 0 },
            eth: { url: 'https://freeethereum.com/', lastDone: 0 },
            ada: { url: 'https://freecardano.com/', lastDone: 0 },
            trx: { url: 'https://free-tron.com/', lastDone: 0 },
            dash: { url: 'https://freedash.io/', lastDone: 0 },
            xrp: { url: 'https://coinfaucet.io/', lastDone: 0 },
            xem: { url: 'https://freenem.com/', lastDone: 0 },
            steam: { url: 'https://freesteam.io/', lastDone: 0 },
        }

        //fc = faucetcrypto
        this.fc_data = {
            url: 'https://faucetcrypto.com/dashboard',
            lastDone: 0,
        }
    }

    //fonction get most recent
    //get ff or fc
    //etc
}
