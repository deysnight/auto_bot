"use strict";

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _express2 = _interopRequireDefault(require("./config/express"));

var _browser = _interopRequireDefault(require("./browser"));

var _scheduler = _interopRequireDefault(require("./scheduler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function App() {
  return _App.apply(this, arguments);
}

function _App() {
  _App = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var expressApp_base, expressApp, scheduler;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expressApp_base = (0, _express.default)();
            _context.prev = 1;
            console.log("[".concat(process.env.APP_NAME, "] is starting"));
            expressApp = (0, _express2.default)(expressApp_base);
            _context.next = 6;
            return _browser.default.init();

          case 6:
            scheduler = new _scheduler.default(_browser.default);
            scheduler.runtime = true;
            scheduler.startup();
            expressApp.locals.scheduler = scheduler; //await Browser.test() //test

            expressApp.listen(process.env.port, function () {
              return console.log("[Server] ".concat(process.env.APP_NAME, " listening on ").concat(process.env.PORT, " in ").concat(process.env.MODE, " mode"));
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));
  return _App.apply(this, arguments);
}

var _default = App();

exports.default = _default;