import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import envConfig from '../config/env.config.js';
import path from 'path';
import { eSignal, eSignalExit } from '../entities/global.enum.js';

class sBrowser {
  defaultUserDataDir: string = path.join(path.resolve(), 'puppeteer_autobot');
  pathToExtension: string = path.join(
    path.resolve(),
    'browserExtensions',
    'Buster_Captcha_Solver'
  );
  browser?: Browser;
  page?: Page;

  constructor() {}

  async init() {
    puppeteer.use(StealthPlugin());
    puppeteer.use(AdblockerPlugin());

    this.browser = await puppeteer.launch({
      defaultViewport: {
        width: envConfig.browser.width,
        height: envConfig.browser.height,
        deviceScaleFactor: envConfig.browser.deviceScaleFactor,
      },
      args: [
        '--no-sandbox',
        `--disable-extensions-except=${this.pathToExtension}`,
        `--load-extension=${this.pathToExtension}`,
      ],
      ignoreDefaultArgs: ['--disable-background-networking'],

      userDataDir: envConfig.browser.userDataDir ?? this.defaultUserDataDir,
      headless: envConfig.browser.headless,
    });

    this.page = (await this.browser.pages())[0];
    await this.page.goto('https://www.google.com/', {
      waitUntil: 'networkidle0',
    });

    process.on(eSignalExit, async () => await this.close());
  }

  async close() {
    this.browser?.close();
    (process.emit as Function)(eSignal.BROWSER);
  }
}

export default sBrowser;
