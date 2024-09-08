import { Engine } from '../../engine/engine';
import { Camera } from '../../engine/models/camera';
import { Keyboard } from '../../engine/models/Keyboard';
import { ObjectImage } from '../../engine/models/objects/objectImage';
import { Vector2 } from '../../engine/models/vector2';

export class DialogObject extends ObjectImage {

  private static open: boolean = false
  private static text: string = ""
  private static icon: HTMLImageElement | null = null;
  private static currentChar: number = -1;
  private elapsed = -1
  public static get isOpen() { return this.open }

  constructor() {
    super(new Vector2(0, 0), "img/ui/DialogBoxFaceset.png", true)
    this.imageScale = 2
  }

  update(): void {
    const x = Camera.width / 2 - this.width / 2
    const y = Camera.height - this.height - 50
    this.pos = new Vector2(x, y)

    if (DialogObject.open && Keyboard.escape) {
      DialogObject.open = false
      DialogObject.text = ""
      DialogObject.currentChar = -1
      DialogObject.icon = null;
    }
  }

  draw(position: Vector2): void {
    if (!DialogObject.open) return
    super.draw(position)
    this.drawText(position)
    this.drawIcon(position)
  }

  drawIcon(position: Vector2) {
    if (!DialogObject.icon) return;
    const x = position.x + 6 * this.imageScale
    const y = position.y + 14 * this.imageScale
    const w = 38 * this.imageScale
    const h = 38 * this.imageScale

    Engine.context.drawImage(DialogObject.icon, x, y, w, h)
  }

  drawText(position: Vector2) {
    const x = position.x + 50 * this.imageScale + 6
    const y = position.y + 14 * this.imageScale + 6
    const w = 240 * this.imageScale
    const h = 33 * this.imageScale
    const lineSpace = 6 * this.imageScale

    Engine.context.fillStyle = 'black'
    Engine.context.font = (6 * this.imageScale) + 'px Arial'
    Engine.context.textBaseline = 'top'

    if (DialogObject.currentChar < DialogObject.text.length)
      this.updateCurrentChar()

    const lines: string[] = this.createLines(w)

    for (let l = 0; l < lines.length; l++)
      Engine.context.fillText(lines[l].trim(), x, y + lineSpace * l, w)
  }
  private createLines(maxWidth: number): string[] {
    const lines: string[] = [""]
    let cLine = 0;

    for (let i = 0; i < DialogObject.currentChar; i++) {
      const newChar = DialogObject.text[i]
      const metrics = Engine.context.measureText(lines[cLine] + newChar)
      if (metrics.width < maxWidth) lines[cLine] += newChar
      else {
        let lastWorld = ''
        if (lines[cLine][i - 1] != " ") {
          lastWorld = lines[cLine].slice(lines[cLine].lastIndexOf(' '), lines[cLine].length)
          lines[cLine] = lines[cLine].slice(0, lines[cLine].lastIndexOf(' '))
        }
        cLine++
        lines[cLine] = lastWorld + newChar
      }
    }
    return lines
  }

  private updateCurrentChar() {
    this.elapsed++;
    this.elapsed = this.elapsed % 61 == 0 ? 1 : this.elapsed
    if (this.elapsed % 1 == 0) DialogObject.currentChar++
  }

  static show(text: string, icon: HTMLImageElement) {
    DialogObject.open = true
    DialogObject.text = text
    DialogObject.icon = icon;
  }

}