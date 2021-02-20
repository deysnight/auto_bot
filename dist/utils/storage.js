"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Storage = function Storage() {
  var _this = this;

  _classCallCheck(this, Storage);

  _defineProperty(this, "ff_checkTimeout", function (currency, timeout) {
    var now = Date.now();
    var last = _this.ff_data[currency].lastDone;

    if (now - last > timeout * 1000) {
      return true;
    }

    return false;
  });

  _defineProperty(this, "ff_update_last", function (currency) {
    _this.ff_data[currency].lastDone = Date.now();
  });

  // config
  this.emptydata = {
    freefaucet: {
      usdt: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      usdc: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      bnb: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      btc: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      eth: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      ada: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      trx: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      dash: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      xrp: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      xem: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      steam: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      ltc: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      link: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      },
      neo: {
        claimcount: 0,
        balance: 0.0,
        lastDone: 0
      }
    },
    faucetcrypto: {
      ptccount: 0,
      shortlinkcount: 0,
      balance: 0.0,
      lastDone: 0
    }
  }; // ff = freefaucet

  this.ff_currencies = ['usdt', 'usdc', 'bnb', 'btc', 'eth', 'ada', 'trx', 'dash', 'xrp', 'xem', 'steam', 'ltc', 'link', 'neo'];
  this.ff_data = {
    usdt: {
      url: 'https://freetether.com/free',
      lastDone: 0
    },
    usdc: {
      url: 'https://freeusdcoin.com/free',
      lastDone: 0
    },
    bnb: {
      url: 'https://freebinancecoin.com/free',
      lastDone: 0
    },
    btc: {
      url: 'https://freebitcoin.io/free',
      lastDone: 0
    },
    eth: {
      url: 'https://freeethereum.com/free',
      lastDone: 0
    },
    ada: {
      url: 'https://freecardano.com/free',
      lastDone: 0
    },
    trx: {
      url: 'https://free-tron.com/free',
      lastDone: 0
    },
    dash: {
      url: 'https://freedash.io/free',
      lastDone: 0
    },
    xrp: {
      url: 'https://coinfaucet.io/free',
      lastDone: 0
    },
    xem: {
      url: 'https://freenem.com/free',
      lastDone: 0
    },
    steam: {
      url: 'https://freesteam.io/free',
      lastDone: 0
    },
    ltc: {
      url: 'https://free-ltc.com/free',
      lastDone: 0
    },
    link: {
      url: 'https://freechainlink.io/free',
      lastDone: 0
    },
    neo: {
      url: 'https://freeneo.io/free',
      lastDone: 0
    }
  }; // fc = faucetcrypto

  this.fc_data = {
    url: 'https://faucetcrypto.com/dashboard',
    lastDone: 0
  }; //temp

  this.ff_mail = "hortonixx0@yahoo.fr";
  this.ff_password = "lollollol";
} // fonction get most recent
// get ff or fc
// etc
;

exports.default = Storage;