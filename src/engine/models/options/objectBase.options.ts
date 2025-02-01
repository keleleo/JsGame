import { Vector2 } from '../vector2';

export interface ObjectBaseOptions {
  position: Vector2,
  /***
   *  @default 0
  */
  width?: number,
  /***
   *  @default 0
  */
  height?: number,
  /***
   *  @default false
  */
  fixedOnScreen?: boolean;
  /***
   *  @default false
  */
  colider?: boolean;
}