import { Mat } from '@u4/opencv4nodejs';
import { ISize } from './icv.entity';
import Match from '../match.entity';
import Image from '../image.entity';

interface IImage {
  size: ISize;
  data: Mat;

  getSize(): ISize;
  copy(): IImage;
  findMatch(template: Image, threshold: number): Match;
  findMatches(template: Image, threshold: number): Match[];
}

export default IImage;
