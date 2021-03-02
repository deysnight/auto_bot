"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _npid = _interopRequireDefault(require("npid"));

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
  _App = _asyncToGenerator(function* () {
    var expressApp_base = (0, _express.default)();

    try {
      console.log("[".concat(process.env.APP_NAME, "] is starting"));

      try {
        var pid = _npid.default.create(process.env.PIDFILE);

        pid.removeOnExit();
      } catch (err) {
        console.log(err);
        process.exit(1);
      }

      var expressApp = (0, _express2.default)(expressApp_base);
      yield _browser.default.init();
      var scheduler = new _scheduler.default(_browser.default); //scheduler.runtime = true

      scheduler.startup();
      expressApp.locals.scheduler = scheduler; //await Browser.test() //test

      expressApp.listen(process.env.PORT, () => console.log("[Server] ".concat(process.env.APP_NAME, " listening on ").concat(process.env.PORT, " in ").concat(process.env.MODE, " mode")));
    } catch (e) {
      console.log(e);
    }
  });
  return _App.apply(this, arguments);
}

var _default = App();

exports.default = _default;