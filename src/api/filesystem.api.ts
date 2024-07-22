import Store from '../services/storage.service.js';
import Image from '../entities/image.entity.js';
import path from 'path';
import cv from '@u4/opencv4nodejs';

abstract class FS {
  /**
   * Load a PNG image from the ressource folder of the task.
   */
  static loadImg(imgPath: string): Image {
    const store = Store.getStore();
    const fullPath = path.join(
      path.resolve(),
      'tasks_static_ressources',
      store.getTaskName(store.getRunningTask()),
      imgPath
    );
    return new Image(fullPath, true);
  }

  /**
   * Save image as PNG in the ressource folder of the task.
   */
  static saveImg(img: Image, imgPath: string): void {
    const store = Store.getStore();
    const fullPath = path.join(
      path.resolve(),
      'tasks_static_ressources',
      store.getTaskName(store.getRunningTask()),
      imgPath
    );
    cv.imwrite(fullPath, img.data);
  }
}

export default FS;
