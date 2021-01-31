import cv from 'opencv4nodejs'

class Image {
    constructor(path = null, file = false) {
        if (path instanceof cv.Mat === true) {
            this.image = path
        } else {
            if (path != null && file === true) {
                this.image = cv.imread(path)
            } else {
                this.image = null
            }
        }
    }

    getSize = () => {
        const [height, width] = this.image.sizes
        return { width, height }
    }
}
