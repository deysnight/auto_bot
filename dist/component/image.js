"use strict";

var _opencv4nodejs = _interopRequireDefault(require("opencv4nodejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Image {
  constructor() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _defineProperty(this, "getSize", () => {
      var [height, width] = this.image.sizes;
      return {
        width,
        height
      };
    });

    if (path instanceof _opencv4nodejs.default.Mat === true) {
      this.image = path;
    } else {
      if (path != null && file === true) {
        this.image = _opencv4nodejs.default.imread(path);
      } else {
        this.image = null;
      }
    }
  }

}