"use strict";

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _opencv4nodejs = _interopRequireDefault(require("opencv4nodejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Browser = /*#__PURE__*/function () {
  function Browser() {
    _classCallCheck(this, Browser);
  }

  _createClass(Browser, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var blockedDomains;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _puppeteer.default.launch({
                  defaultViewport: {
                    width: 1280,
                    height: 720,
                    deviceScaleFactor: 1
                  },
                  headless: false
                });

              case 2:
                this.browser = _context2.sent;
                _context2.next = 5;
                return this.browser.pages();

              case 5:
                _context2.next = 7;
                return _context2.sent[0];

              case 7:
                this.page = _context2.sent;
                this.browser.on("targetcreated", /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(target) {
                    var page;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return target.page();

                          case 2:
                            page = _context.sent;
                            if (page) page.close();

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()); //this.page = await this.browser.newPage()

                _context2.next = 11;
                return this.page.setRequestInterception(true);

              case 11:
                blockedDomains = ['mgid', 'googletagmanager', 'exoprsdds', 'bmcdn1', 'a-ads', 'adclerks', 'moonicorn', 'adclerks', 'addragon', 'coinzillatag', 'revcontent', 'bitmedia', 'ppfrlfe', 'trtjigpsscmv9epe10'];
                this.page.on('request', function (interceptedRequest) {
                  if (blockedDomains.includes(new URL(interceptedRequest.url()).host)) {
                    interceptedRequest.abort();
                  } else {
                    interceptedRequest.continue();
                  }
                });
                _context2.next = 15;
                return this.page.goto('https://www.google.com/');

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "test",
    value: function () {
      var _test = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var tmp1, buffer1, img1, tmp2, img2;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.page.goto('https://faucetcrypto.com/dashboard');

              case 2:
                //await this.page.screenshot({ path: 'test.png' })
                console.time('tmp1');
                _context3.next = 5;
                return this.page.screenshot({
                  encoding: 'base64'
                });

              case 5:
                tmp1 = _context3.sent;
                buffer1 = Buffer.from(tmp1, 'base64');
                img1 = _opencv4nodejs.default.imdecode(buffer1);
                console.timeEnd('tmp1');
                console.time('tmp2');
                _context3.next = 12;
                return this.page.screenshot();

              case 12:
                tmp2 = _context3.sent;
                img2 = _opencv4nodejs.default.imdecode(tmp2);
                console.timeEnd('tmp2');

                _opencv4nodejs.default.imshow('a img1 name', img1);

                _opencv4nodejs.default.imshow('a img2 name', img2);

                _opencv4nodejs.default.waitKey();

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function test() {
        return _test.apply(this, arguments);
      }

      return test;
    }()
  }]);

  return Browser;
}();

var _default = new Browser();

exports.default = _default;