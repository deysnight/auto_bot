"use strict";

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

var _utils = require("./utils/utils");

var _storage = _interopRequireDefault(require("./utils/storage"));

var _url = _interopRequireDefault(require("url"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Scheduler = function Scheduler(browser) {
  var _this = this;

  _classCallCheck(this, Scheduler);

  _defineProperty(this, "save_state", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _fs.default.writeFile(process.env.DATAFILE, JSON.stringify(_this.data), function writeJSON(err) {
              if (err) return console.log(err);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  _defineProperty(this, "startup", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _iterator, _step, currency, _iterator2, _step2, _currency;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (_fs.default.existsSync(process.env.DATAFILE) === false) {
              _fs.default.writeFileSync(process.env.DATAFILE, JSON.stringify(_this.data));
            } else {
              _this.data = _objectSpread({}, JSON.parse(_fs.default.readFileSync(process.env.DATAFILE)));
              _iterator = _createForOfIteratorHelper(_this.storage.ff_currencies);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  currency = _step.value;
                  _this.storage.ff_data[currency].lastDone = _this.data.freefaucet[currency].lastDone;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

          case 1:
            if (!1) {
              _context2.next = 39;
              break;
            }

            console.log("runtime: ", _this.runtime);

            if (!(_this.runtime === true)) {
              _context2.next = 34;
              break;
            }

            // loop
            // run_loop_free_faucet()
            // run_loop_faucet_crypto()
            _iterator2 = _createForOfIteratorHelper(_this.storage.ff_currencies);
            _context2.prev = 5;

            _iterator2.s();

          case 7:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 21;
              break;
            }

            _currency = _step2.value;

            if (!(_this.storage.ff_checkTimeout(_currency, 60 * 60) == true)) {
              _context2.next = 19;
              break;
            }

            _context2.prev = 10;
            _context2.next = 13;
            return _this.free_faucet_loop(_currency);

          case 13:
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](10);
            console.log("got error");
            console.log(_context2.t0);

          case 19:
            _context2.next = 7;
            break;

          case 21:
            _context2.next = 26;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t1 = _context2["catch"](5);

            _iterator2.e(_context2.t1);

          case 26:
            _context2.prev = 26;

            _iterator2.f();

            return _context2.finish(26);

          case 29:
            _this.faucet_crypto_loop();

            _context2.next = 32;
            return (0, _utils.sleep)(5000);

          case 32:
            _context2.next = 37;
            break;

          case 34:
            if (!(_this.runtime === false)) {
              _context2.next = 37;
              break;
            }

            _context2.next = 37;
            return (0, _utils.sleep)(5000);

          case 37:
            _context2.next = 1;
            break;

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 23, 26, 29], [10, 15]]);
  })));

  _defineProperty(this, "free_faucet_loop", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(currency) {
      var pathname, balance, isClaimable, new_balance;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this.browser.page.goto(_this.storage.ff_data[currency].url);

            case 2:
              _context3.next = 4;
              return (0, _utils.sleep)(2000);

            case 4:
              //check if logged
              pathname = new _url.default.URL(_this.browser.page.url()).pathname;

              if (!(pathname.indexOf("free") === -1)) {
                _context3.next = 16;
                break;
              }

              _context3.next = 8;
              return _this.browser.page.type('.form-control.email', _this.storage.ff_mail);

            case 8:
              _context3.next = 10;
              return _this.browser.page.type('.form-control.password', _this.storage.ff_password);

            case 10:
              _context3.next = 12;
              return _this.browser.page.click('.main-button.main-button-yellow.login.bg-3');

            case 12:
              _context3.next = 14;
              return _this.browser.page.waitForNavigation();

            case 14:
              _context3.next = 16;
              return (0, _utils.sleep)(3000);

            case 16:
              _context3.next = 18;
              return _this.browser.page.$eval('.navbar-coins.bg-1', function (divs) {
                return parseFloat(divs.children[0].innerText.split(' ')[0]);
              });

            case 18:
              balance = _context3.sent;
              _context3.next = 21;
              return _this.browser.page.$eval('.timeout-wrapper', function (divs) {
                return divs.style.display;
              });

            case 21:
              isClaimable = _context3.sent;

              if (!(isClaimable == "none")) {
                _context3.next = 38;
                break;
              }

              console.log("claim");
              _context3.next = 26;
              return _this.browser.page.click('.main-button-2.roll-button.bg-2');

            case 26:
              _context3.next = 28;
              return (0, _utils.sleep)(4000);

            case 28:
              _context3.next = 30;
              return _this.browser.page.$eval('.navbar-coins.bg-1', function (divs) {
                return parseFloat(divs.children[0].innerText.split(' ')[0]);
              });

            case 30:
              new_balance = _context3.sent;

              //update lastDone
              _this.storage.ff_update_last(currency);

              _this.data.freefaucet[currency].claimcount += 1;
              _this.data.freefaucet[currency].balance += new_balance;
              _this.data.freefaucet[currency].lastDone = Date.now();

              _this.save_state();

              _context3.next = 39;
              break;

            case 38:
              console.log("not claimable");

            case 39:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "faucet_crypto_loop", function () {
    _this.runtime = false;
  });

  this.browser = browser;
  this.runtime = false;
  this.storage = new _storage.default();
  this.data = _objectSpread({}, this.storage.emptydata);
};

exports.default = Scheduler;