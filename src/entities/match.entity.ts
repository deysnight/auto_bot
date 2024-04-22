import { ICoord, ISize } from './ientities/icv.entity';
import IMatch from './ientities/imatch.entity';

class Match implements IMatch {
  _isValid: boolean;
  score: number;
  position: ICoord;
  size: ISize;

  constructor(isValid: boolean, score: number, position: ICoord, size: ISize) {
    this._isValid = isValid;
    this.score = score;
    this.position = position;
    this.size = size;
  }

  getTopLeft(): ICoord {
    return this.position;
  }

  getCenter(): ICoord {
    const x = Math.round(this.position.x + this.size.width / 2);
    const y = Math.round(this.position.y + this.size.height / 2);
    return { x, y };
  }

  getCentX(): number {
    return Math.round(this.position.x + this.size.width / 2);
  }

  getCentY(): number {
    return Math.round(this.position.y + this.size.height / 2);
  }

  isValid(): boolean {
    return this._isValid;
  }
}

export default Match;
