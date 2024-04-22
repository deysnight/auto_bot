import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import envConfig from '../config/env.config.js';
import path from 'path';
import { eSignal, eSignalExit } from '../entities/global.enum.js';
import Image from '../entities/image.entity.js';
import cv from '@u4/opencv4nodejs';
class sBrowser {
  defaultUserDataDir: string = path.join(path.resolve(), 'puppeteer_autobot');
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
      args: ['--no-sandbox'],
      userDataDir: envConfig.browser.userDataDir ?? this.defaultUserDataDir,
      headless: envConfig.browser.headless,
    });

    this.page = (await this.browser.pages())[0];
    await this.page.goto('https://www.google.com/', {
      waitUntil: 'networkidle0',
    });

    process.on(eSignalExit, async () => await this.close());

    this.test();
  }

  test() {
    const originalMat = cv.imread(`screenshot.jpg`);
    const waldoMat = cv.imread(`tmp.png`);

    // Match template (the brightest locations indicate the highest match)
    const matched = originalMat.matchTemplate(waldoMat, 5);

    // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
    let minMax = matched.minMaxLoc();
    let {
      maxLoc: { x, y },
    } = minMax;

    // Draw bounding rectangle
    originalMat.drawRectangle(
      new cv.Rect(x, y, waldoMat.cols, waldoMat.rows),
      new cv.Vec3(0, 255, 0),
      2,
      cv.LINE_8
    );

    // Open result in new window
    cv.imshow("We've found Waldo!", originalMat);
    cv.waitKey();

    matched.drawRectangle(
      new cv.Rect(x, y, waldoMat.cols, waldoMat.rows),
      new cv.Vec3(0, 0, 0),
      cv.FILLED
    );

    minMax = matched.minMaxLoc();
    let { maxLoc } = minMax;

    originalMat.drawRectangle(
      new cv.Rect(maxLoc.x, maxLoc.y, waldoMat.cols, waldoMat.rows),
      new cv.Vec3(0, 255, 0),
      2,
      cv.LINE_8
    );

    cv.imshow("We've found Waldo!", originalMat);
    cv.waitKey();
  }

  async close() {
    this.browser?.close();
    (process.emit as Function)(eSignal.BROWSER);
  }
}

export default sBrowser;
