import { ICoord, ISize } from './icv.entity';

interface IMatch {
  _isValid: boolean;
  score: number;
  position: ICoord;
  size: ISize;

  getTopLeft(): ICoord;
  getCenter(): ICoord;
  getCentX(): number;
  getCentY(): number;
  isValid(): boolean;
}

export default IMatch;
