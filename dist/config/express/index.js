"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("../../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(expressApp) {
  expressApp.use(_express.default.json());
  expressApp.use(_express.default.urlencoded());
  expressApp.use('*', function (req, res, next) {
    /*res.header(
        'Access-Control-Allow-Methods',
        'PUT, GET, POST, DELETE, OPTIONS, PATCH'
    )*/
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Correlation-ID, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200).end();
    }

    return next();
  });
  expressApp.use('/', (0, _router.default)());
  return expressApp;
}