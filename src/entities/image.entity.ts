import cv, { Mat } from '@u4/opencv4nodejs';
import { ISize } from './ientities/icv.entity';
import IImage from './ientities/iimage.entity';
import { PNG } from 'pngjs';
import Match from './match.entity';

class Image implements IImage {
  size: ISize;
  data: Mat;

  constructor(
    input: Buffer | string,
    isFile: boolean = true,
    isCopy: boolean = false,
    copyData: ISize = { width: 0, height: 0 }
  ) {
    if (isFile === true) {
      this.data = cv.imread(input as string);
      this.size = { width: this.data.cols, height: this.data.rows };
    } else if (isCopy === true) {
      this.data = new cv.Mat(
        input as Buffer,
        copyData.height,
        copyData.width,
        cv.CV_8UC4
      );
      this.size = copyData;
    } else {
      const { data, width, height } = PNG.sync.read(input as Buffer);
      data.map((item, index) => {
        if (index % 4 === 0) {
          data[index] = data[index + 2];
          data[index + 2] = item;
        }
        return item;
      });
      this.data = new cv.Mat(data, height, width, cv.CV_8UC4);
      this.size = { width, height };
    }
  }

  getSize(): ISize {
    return this.size;
  }

  getData() {
    return this.data;
  }

  copy(): Image {
    const data = this.data.getData();
    const newImage = new Image(data, false, true, this.size);
    return newImage;
  }

  findMatch(template: Image, threshold: number): Match {
    const matched = this.data.matchTemplate(template.data, cv.TM_CCORR_NORMED);
    const minMax = matched.minMaxLoc();
    const { maxLoc, maxVal } = minMax;
    const validMatch = maxVal > threshold;
    return new Match(validMatch, maxVal, maxLoc, template.getSize());
  }

  findMatches(template: Image, threshold: number): Match[] {
    const result: Match[] = [];
    const tplSize = template.getSize();
    let looping = true;

    const matched = this.data.matchTemplate(template.data, cv.TM_CCORR_NORMED);
    while (looping) {
      let minMax = matched.minMaxLoc();
      let { maxLoc, maxVal } = minMax;

      if (maxVal < threshold) {
        looping = false;
      } else {
        let match = new Match(true, maxVal, maxLoc, tplSize);
        result.push(match);
        matched.drawRectangle(
          new cv.Rect(maxLoc.x, maxLoc.y, tplSize.width, tplSize.height),
          new cv.Vec3(0, 0, 0),
          cv.FILLED
        );
      }
    }
    return result;
  }
}

export default Image;
