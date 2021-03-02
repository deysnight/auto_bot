"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils/utils");

var _storage = _interopRequireDefault(require("./utils/storage"));

var _url = _interopRequireDefault(require("url"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Scheduler {
  constructor(browser) {
    var _this = this;

    _defineProperty(this, "save_state", /*#__PURE__*/_asyncToGenerator(function* () {
      _fs.default.writeFile(process.env.DATAFILE, JSON.stringify(_this.data), function writeJSON(err) {
        if (err) return console.log(err);
      });
    }));

    _defineProperty(this, "update_config", new_config => {
      this.config = _objectSpread({}, new_config);

      _fs.default.writeFile(process.env.CONFFILE, JSON.stringify(new_config), function writeJSON(err) {
        if (err) return console.log(err);
      });
    });

    _defineProperty(this, "switch_state", new_state => {
      if (new_state === 'true') {
        this.runtime = true;
      } else {
        this.runtime = false;
      }
    });

    _defineProperty(this, "startup", /*#__PURE__*/_asyncToGenerator(function* () {
      if (_fs.default.existsSync(process.env.DATAFILE) === false) {
        _fs.default.writeFileSync(process.env.DATAFILE, JSON.stringify(_this.data));
      } else {
        _this.data = _objectSpread({}, JSON.parse(_fs.default.readFileSync(process.env.DATAFILE)));

        for (var currency of _this.storage.ff_currencies) {
          _this.storage.ff_data[currency].lastDone = _this.data.freefaucet[currency].lastDone;
        }
      }

      if (_fs.default.existsSync(process.env.CONFFILE) === false) {
        _fs.default.writeFileSync(process.env.CONFFILE, JSON.stringify(_this.config));
      } else {
        _this.config = _objectSpread({}, JSON.parse(_fs.default.readFileSync(process.env.CONFFILE)));
      }

      while (1) {
        console.log("runtime: ", _this.runtime);

        if (_this.runtime === true) {
          if (_this.config.freefaucet.enabled == true) {
            for (var _currency of _this.storage.ff_currencies) {
              if (_this.storage.ff_checkTimeout(_currency, 60 * 60) == true) {
                try {
                  yield _this.free_faucet_loop(_currency);
                } catch (e) {
                  console.log("got error");
                  console.log(e);
                } //break;

              }
            }
          }

          if (_this.config.faucetcrypto.enabled == true) {
            if (_this.storage.fc_checkTimeout(60 * 60) == true) {
              try {
                yield _this.faucet_crypto_loop();
              } catch (e) {
                console.log("got error");
                console.log(e);
              } //break;

            }
          }

          yield (0, _utils.sleep)(5000);
        } else if (_this.runtime === false) {
          yield (0, _utils.sleep)(5000);
        }
      }
    }));

    _defineProperty(this, "free_faucet_loop", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (currency) {
        //goto URL
        yield _this.browser.page.goto(_this.storage.ff_data[currency].url);
        yield (0, _utils.sleep)(2000); //check if logged

        var pathname = new _url.default.URL(_this.browser.page.url()).pathname;

        if (pathname.indexOf("free") === -1) {
          //need to loggin
          //try to close tuto window a start
          try {
            yield _this.browser.page.click('.d-none.d-lg-block > div:nth-child(1)');
            yield (0, _utils.sleep)(1000);
          } catch (error) {//PASS
          } //mail


          yield _this.browser.page.type('.form-control.email', _this.config.freefaucet.login); //password

          yield _this.browser.page.type('.form-control.password', _this.config.freefaucet.password); //click on log in

          yield _this.browser.page.click('.main-button.main-button-yellow.login.bg-3');
          yield _this.browser.page.waitForNavigation({
            waitUntil: 'load',
            timeout: 0
          });
          yield (0, _utils.sleep)(3000);
          var list_page = yield _this.browser.browser.pages();
          var current_page = list_page[list_page.length - 1];
          var current_url = current_page.url();

          if (new URL(current_url).host != new URL(_this.storage.ff_data[currency].url).host) {
            yield current_page.goto('about:blank');
            yield (0, _utils.sleep)(8000);
            yield current_page.close();
          }

          yield (0, _utils.sleep)(5000);
        } //check balance


        var balance = yield _this.browser.page.$eval('.navbar-coins.bg-1', divs => {
          return parseFloat(divs.children[0].innerText.split(' ')[0]);
        }); //check if claim available

        var isClaimable = yield _this.browser.page.$eval('.timeout-wrapper', divs => {
          return divs.style.display;
        });

        if (isClaimable == "none") {
          console.log("claim");
          yield _this.browser.page.click('.main-button-2.roll-button.bg-2');
          yield (0, _utils.sleep)(4000);
          var new_balance = yield _this.browser.page.$eval('.navbar-coins.bg-1', divs => {
            return parseFloat(divs.children[0].innerText.split(' ')[0]);
          }); //update lastDone

          _this.storage.ff_update_last(currency);

          _this.data.freefaucet[currency].claimcount += 1;
          _this.data.freefaucet[currency].balance = new_balance;
          _this.data.freefaucet[currency].lastclaim = new_balance - balance;
          _this.data.freefaucet[currency].lastDone = Date.now();

          _this.save_state();
        } else {
          console.log("not claimable");
        }
      });

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "faucet_crypto_loop", /*#__PURE__*/_asyncToGenerator(function* () {
      //goto URL
      yield _this.browser.page.goto(_this.storage.fc_data.url);
      yield (0, _utils.sleep)(2000); //check if logged

      var pathname = new _url.default.URL(_this.browser.page.url()).pathname;

      if (pathname.indexOf("dashboard") === -1) {
        //need to loggin
        //mail
        yield _this.browser.page.type('.mb-4 > .mt-1.relative.rounded-md.shadow-sm > input', _this.config.faucetcrypto.login); //password

        yield _this.browser.page.type('.mb-6 > .mt-1.relative.rounded-md.shadow-sm > input', _this.config.faucetcrypto.password); //click on log in

        yield _this.browser.page.click('.w-full.inline-flex.rounded-md.shadow > button');
        yield _this.browser.page.waitForNavigation();
        yield (0, _utils.sleep)(3000); //try to close tuto window a start

        try {
          yield _this.browser.page.click('.inline-flex.rounded-md.shadow-sm:nth-child(1) > button');
          yield (0, _utils.sleep)(3000);
        } catch (error) {//PASS
        } //try to close chat window


        try {
          yield _this.browser.page.click('.chatbro_header_button.chatbro_minimize_button');
          yield (0, _utils.sleep)(3000);
        } catch (error) {//PASS
        }
      } //get current balance


      var current_balance = yield _this.browser.page.$eval('.flex.badge.text-bg-yellow.py-1.transition.duration-150.ease-in-out', divs => {
        return parseFloat(divs.innerText.split(' ')[0]);
      });
      _this.data.faucetcrypto.currentbalance = current_balance;
      yield (0, _utils.sleep)(500); //check if ptc available

      var available_ptc = yield _this.browser.page.$eval('.px-2.py-4.space-y-1.w-full.relative', divs => {
        return divs.children[1].children[2].children.length > 1 ? true : false;
      });
      yield (0, _utils.sleep)(1000); //START PTC

      if (available_ptc == true) {
        //goto ptc page
        yield _this.browser.page.click('.px-2.py-4.space-y-1.w-full.relative > div:nth-child(2) > a:nth-child(3)');
        yield (0, _utils.sleep)(5000);
        var nb_ptc_available = yield _this.browser.page.$eval('.grid.grid-responsive-3', divs => {
          return parseFloat(divs.children.length);
        });
        var nb_ptc_remaining = nb_ptc_available;

        do {
          //get ptc timer
          var timer_for_ptc = yield _this.browser.page.$eval('.grid.grid-responsive-3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)', divs => {
            return parseFloat(divs.innerText.split(' ')[0]);
          }); //get ptc reward

          var ptc_reward = yield _this.browser.page.$eval('.grid.grid-responsive-3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)', divs => {
            return parseFloat(divs.innerText.split(' ')[0]);
          }); //click on ptc

          yield _this.browser.page.click('.grid.grid-responsive-3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span > a');
          yield _this.browser.page.waitForNavigation();
          yield (0, _utils.sleep)(5000); //ptc interpage

          console.log("1");
          yield _this.browser.page.waitForFunction("document.querySelector('.flex.justify-center.my-6 > div:nth-child(1) > span:nth-child(1) > button:nth-child(2)').classList.contains('cursor-not-allowed') == false");
          console.log("2");
          yield (0, _utils.sleep)((0, _utils.randomInt)(2, 7) * 1000);
          yield _this.browser.page.click('.flex.justify-center.my-6 > div:nth-child(1) > span:nth-child(1) > button:nth-child(2)');
          console.log("3"); //'.flex.justify-center.my-6 > span:nth-child(2) > button'
          //wait for timer

          yield (0, _utils.sleep)(((0, _utils.randomInt)(3, 10) + timer_for_ptc) * 1000); //click on continue

          yield _this.browser.page.click('.notranslate.inline-flex.rounded-md.shadow-sm > a');
          yield _this.browser.page.waitForNavigation();
          yield (0, _utils.sleep)(5000);
          var list_page = yield _this.browser.browser.pages();
          var current_page = list_page[list_page.length - 1];
          var current_url = current_page.url();

          if (new URL(current_url).host != 'faucetcrypto.com') {
            yield current_page.goto('about:blank');
            yield (0, _utils.sleep)(5000);
            yield current_page.close();
          }

          yield (0, _utils.sleep)(5000); //get new balance

          var new_current_balance = yield _this.browser.page.$eval('.flex.badge.text-bg-yellow.py-1.transition.duration-150.ease-in-out', divs => {
            return parseFloat(divs.innerText.split(' ')[0]);
          });
          var old_nb_ptc_remaining = nb_ptc_remaining;
          nb_ptc_remaining = yield _this.browser.page.$eval('.grid.grid-responsive-3', divs => {
            return parseFloat(divs.children.length);
          }); // if ptc succed

          console.log("old_nb_ptc_remaining", old_nb_ptc_remaining);
          console.log("nb_ptc_remaining", nb_ptc_remaining);

          if (old_nb_ptc_remaining != nb_ptc_remaining) {
            _this.data.faucetcrypto.currentbalance = new_current_balance;
            _this.data.faucetcrypto.ptc.claimcount += 1;
            _this.data.faucetcrypto.ptc.totalearn += ptc_reward;

            if (!(nb_ptc_remaining > 0)) {
              _this.data.faucetcrypto.ptc.lastDone = Date.now();

              _this.storage.fc_update_last("ptc");
            }

            _this.save_state();
          }
        } while (nb_ptc_remaining > 0);
      } //END PTC
      //check if shortline available


      var available_shortlink = yield _this.browser.page.$eval('.px-2.py-4.space-y-1.w-full.relative > div:nth-child(2) > a:nth-child(4) > span:nth-child(2)', divs => {
        return divs.innerText > 2 ? true : false;
      });
      yield (0, _utils.sleep)(1000); //START PTC

      if (available_shortlink == true) {
        console.log("shortlink");
      }

      _this.runtime = false;
    }));

    this.browser = browser;
    this.runtime = false;
    this.storage = new _storage.default();
    this.data = _objectSpread({}, this.storage.emptydata);
    this.config = _objectSpread({}, this.storage.emptyconfig);
  }

}

exports.default = Scheduler;