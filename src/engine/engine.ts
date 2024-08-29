import { LayerManager } from './controllers/layerManager'
import { Camera } from './models/camera'
import { Keyboard } from './models/Keyboard'

export class Engine {
  static canvasElement: HTMLCanvasElement
  static ctx: CanvasRenderingContext2D

  static get canvas(): HTMLCanvasElement { return this.canvasElement }
  static get context(): CanvasRenderingContext2D { return this.ctx }

  static init(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Error on get canvas context')
    this.ctx = ctx
    this.canvasElement = canvas
    Camera.initSizeUpdate();
    Keyboard.init()
    this.loop()
  }

  static loop() {
    requestAnimationFrame(() => this.loop())
    this.clearScreen()
    LayerManager.update()
  }

  static clearScreen() {
    this.context.clearRect(0, 0, Camera.width, Camera.height)
  }

  static log(...args: any) {
    console.log("[ENGINE]:", ...args)
  }
}
