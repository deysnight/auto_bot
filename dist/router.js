"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initRouter;

var _express = require("express");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initRouter() {
  var router = (0, _express.Router)();
  var static_path = "/www";
  router.get('/', (req, res) => {
    res.sendFile(_path.default.join(process.cwd() + static_path + '/dashboard.html'));
  });
  router.get('/config', (req, res) => {
    res.sendFile(_path.default.join(process.cwd() + static_path + '/config.html'));
  });
  router.get('/data', (req, res) => {
    try {
      var cur_list = req.app.locals.scheduler.storage.ff_currencies;
      var cur_data = req.app.locals.scheduler.data;
      return res.status(200).json({
        success: true,
        list: cur_list,
        data: cur_data
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        msg: e.message
      });
    }
  });
  router.get('/cfg', (req, res) => {
    try {
      var cur_cfg = req.app.locals.scheduler.config;
      return res.status(200).json({
        success: true,
        config: Buffer.from(JSON.stringify(cur_cfg)).toString('base64')
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        msg: e.message
      });
    }
  });
  router.post('/cfg', (req, res) => {
    try {
      var new_config = JSON.parse(Buffer.from(req.body.data, 'base64').toString('ascii'));
      req.app.locals.scheduler.update_config(new_config);
      return res.status(200).json({
        success: true
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        msg: e.message
      });
    }
  });
  router.get('/start', (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        state: req.app.locals.scheduler.runtime
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        msg: e.message
      });
    }
  });
  router.post('/start', (req, res) => {
    try {
      req.app.locals.scheduler.switch_state(req.body.state);
      return res.status(200).json({
        success: true
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        msg: e.message
      });
    }
  });
  return router;
}