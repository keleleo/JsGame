import { ColliderManager } from '../engine/controllers/colliderManager';
import { LayerManager } from '../engine/controllers/layerManager';
import { Camera } from '../engine/models/camera';
import { ObjectSolidColor } from '../engine/models/objects/objectSolidColor';
import { Vector2 } from '../engine/models/vector2';
import { getColliderObjects } from './colliders-data';
import { Background } from './entities/background';
import { Player } from './entities/player';
import { getNpcs } from './npcs-data';

enum LayersName {
  "colliders" = "colliders",
  "background" = "background",
  "map_l_1" = "map_l_1",
  "NPC" = "NPC",
  "player" = "player",
  "map_l_2" = "map_l_2",
  "interations" = "interations",
  "UI" = "UI",
}
class CollisionTeste extends ObjectSolidColor {
  constructor(pos: Vector2, width: number, height: number, color: string) {
    super(pos, width, height, color, false)
  }

  update(): void {
    this.color = ColliderManager.hasCollisionWith(this,Game.playerCode,0) ? "green" : "yellow"
  }
}


export class Game {
  public static playerCode = "";

  constructor() {
    Camera.position = new Vector2(1500, 1500)
    this.createLayers()

    for (let collider of getColliderObjects())
      LayerManager.addObejct(LayersName.colliders, collider)
    
    this.createPlayer()
    this.createBackground()
    this.createNpcs();
    const colliderTeste = new CollisionTeste(new Vector2(2210, 1585), 16 * 3, 16 * 3, "pink")
    LayerManager.addObejct(LayersName.map_l_1, colliderTeste)
  }

  createBackground() {
    const background1 = new Background(new Vector2(0, 0), "img/map/map.png");
    const background2 = new Background(new Vector2(0, 0), "img/map/map-details.png");
    const background3 = new Background(new Vector2(0, 0), "img/map/map-details-2.png");

    LayerManager.addObejct(LayersName.background, background1)
    LayerManager.addObejct(LayersName.map_l_1, background2)
    LayerManager.addObejct(LayersName.map_l_2, background3)
  }

  createPlayer() {
    const player = new Player(new Vector2(1981, 1725));
    Game.playerCode = player.code
    LayerManager.addObejct(LayersName.player, player)
  }

  createLayers() {
    for (let key in LayersName)
      LayerManager.createLayer(key as LayersName);
  }

  createNpcs() {
    const npcs = getNpcs()
    for (let npc of npcs)
      LayerManager.addObejct(LayersName.NPC, npc)
  }
}

