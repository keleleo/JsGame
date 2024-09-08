import { LayerManager } from '../engine/controllers/layerManager';
import { Camera } from '../engine/models/camera';
import { Vector2 } from '../engine/models/vector2';
import { getColliderObjects } from './colliders-data';
import { Background } from './entities/background';
import { DialogObject } from './entities/DialogObject';
import { Player } from './entities/player';
import { getNpcs } from './npcs-data';

enum LayersName {
  "colliders" = "colliders",
  "map" = "map",
  "NPC" = "NPC",
  "player" = "player",
  "map_details_1" = "map_details_1",
  "interations" = "interations",
  "UI" = "UI",
}

export class Game {
  public static playerCode = "";

  constructor() {
    Camera.position = new Vector2(1500, 1500)
    this.createLayers()

    for (let collider of getColliderObjects())
      LayerManager.addObejct(LayersName.colliders, collider)
    LayerManager.addObejct(LayersName.UI, new DialogObject())
    this.createPlayer()
    this.createBackground()
    this.createNpcs();
  }

  createBackground() {
    const background1 = new Background(new Vector2(0, 0), "img/map/map.png");
    const background2 = new Background(new Vector2(0, 0), "img/map/map-details.png");

    LayerManager.addObejct(LayersName.map, background1)
    LayerManager.addObejct(LayersName.map_details_1, background2)
  }

  createPlayer() {
    const player = new Player(new Vector2(648 * 3, 624 * 3));
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

