"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _puppeteerExtra = _interopRequireDefault(require("puppeteer-extra"));

var _puppeteerExtraPluginStealth = _interopRequireDefault(require("puppeteer-extra-plugin-stealth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//import cv from 'opencv4nodejs'
class Browser {
  init() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _puppeteerExtra.default.use((0, _puppeteerExtraPluginStealth.default)());

      _this.browser = yield _puppeteerExtra.default.launch({
        defaultViewport: {
          width: 1280,
          height: 720,
          deviceScaleFactor: 1
        },
        args: ['--no-sandbox'],
        headless: true
      });
      _this.page = yield (yield _this.browser.pages())[0];
      /*this.browser.on("targetcreated", async (target)=>{
          const page=await target.page();
          if(page) page.close();
       });*/
      //this.page = await this.browser.newPage()

      yield _this.page.setRequestInterception(true);
      var blockedDomains = ['cdn.mgid.com', 'cm.mgid.com', 'c.mgid.com', 'jsc.mgid.com', 's-img.mgid.com', 'www.googletagmanager.com', 'exoprsdds.com', 'cdn.bmcdn1.com', 'ad.a-ads.com', 'static.a-ads.com/', 'cdn.adclerks.com', 'ads.addragon.com', 'jsc.mgid.com', 'viewm.moonicorn.network', 'coinzillatag.com', 'ppfrlfe.com', 'assets.revcontent.com', 'trtjigpsscmv9epe10.com', 'ad.bitmedia.io'];

      _this.page.on('request', interceptedRequest => {
        //console.log(new URL(interceptedRequest.url()).host)
        if (blockedDomains.includes(new URL(interceptedRequest.url()).host)) {
          interceptedRequest.abort();
        } else {
          interceptedRequest.continue();
        }
      });

      yield _this.page.goto('https://www.google.com/');
    })();
  }
  /*async test() {
      await this.page.goto('https://faucetcrypto.com/dashboard')
      //await this.page.screenshot({ path: 'test.png' })
        console.time('tmp1')
      let tmp1 = await this.page.screenshot({ encoding: 'base64' })
      const buffer1 = Buffer.from(tmp1, 'base64')
      const img1 = cv.imdecode(buffer1)
      console.timeEnd('tmp1')
        console.time('tmp2')
      let tmp2 = await this.page.screenshot()
      const img2 = cv.imdecode(tmp2)
      console.timeEnd('tmp2')
        cv.imshow('a img1 name', img1)
      cv.imshow('a img2 name', img2)
      cv.waitKey()
  }*/


}

var _default = new Browser();

exports.default = _default;