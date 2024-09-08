import { Engine } from '../engine';
import { Camera } from '../models/camera';
import { Crop } from '../models/crop';
import { Layer } from '../models/layer';
import { ObjectBase } from '../models/objects/objectBase';
import { Vector2 } from '../models/vector2';
import { ColliderManager } from './colliderManager';



export class LayerManager {
  private static readonly layers =new Map<string, Layer>()

  private static callUpdate() {
    for (let layer of this.layers.values()) {
      layer.update()
    }
  }
  private static drawObject(object: ObjectBase, position: Vector2, collidersData: Crop[]) {
    const addCollliderData = object.collider && ColliderManager.showCollider
    
    object.draw(position)
    
    if (!addCollliderData) return;
    
    const colliderPos = Camera.positionRelative(new Vector2(object.colliderData.x, object.colliderData.y))
    
    collidersData.push(new Crop(
      colliderPos.x,
      colliderPos.y,
      object.colliderData.width,
      object.colliderData.height
    ))
  }

  private static draw() {
    const collidersData: Crop[] = []

    for (let object of this.getObjectList()) {
      const position = object.fixedOnScreen ? object.position : Camera.positionRelative(object.position)

      const onScreen = Camera.isOnScreen(position, object.width, object.height)
      if (onScreen && object.visible) this.drawObject(object, position, collidersData)
      if(!onScreen && object.fixedOnScreen) console.log(position);
      
    }
    
    for (let data of collidersData) {
      Engine.context.fillStyle = "#3bff4580"
      Engine.context.fillRect(data.x, data.y, data.width, data.height)
    }
  }

  private static * getObjectList() {
    for (let data of this.layers.values()) {
      for (let object of data.getObjects())
        yield object
    }
  }

  static getLayersNames() {
    return Array.from(this.layers.keys())
  }

  static hasLayer(name: string) {
    return this.layers.has(name)
  }

  static createLayer(name: string) {
    if (this.layers.has(name)) throw new Error(`layer "${name}" already exists`)
    this.layers.set(name, new Layer(name))
  }

  static addObejct(layer: Layer | string, object: ObjectBase) {
    if (layer instanceof Layer) {
      layer.addObject(object)
      return
    }
    const temp = this.layers.get(layer)
    if (!temp)
      throw new Error("Layer notfound")

    temp.addObject(object)
  }

  static update() {
    this.callUpdate()
    this.draw()
  }

}