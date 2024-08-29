import { ObjectBase } from './objects/objectBase';

export class Layer {
  private readonly objects = new Map<string, ObjectBase>()
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  remove(obj: ObjectBase | string) {
    if (obj instanceof ObjectBase)
      this.objects.delete(obj.code)
    else
      this.objects.delete(obj)
  }

  addObject(object: ObjectBase) {
    object.addLayer(this)
    this.objects.set(object.code, object)
  }

  update() {
    for (let object of this.objects.values()) {
      object.update && object.update()
    }
  }

  getObjects() {
    return this.objects.values()
  }
}