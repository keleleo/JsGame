export interface Sprite {
  readonly frameRate: number
  readonly frameBuffer: number
  readonly src: string
  /** @default true */
  readonly loop?: boolean
  /** @default true */
  readonly autoPlay?: boolean
  /** @default 1 */
  readonly columns?: number
  /** @default false */
  readonly columnDirection?: boolean
  /** @default 0 */
  readonly firstFrame?: number
}
