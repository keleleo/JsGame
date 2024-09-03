import { Path, PathPoint } from '../engine/models/Path';
import { Vector2 } from '../engine/models/vector2';
import { NPC } from './entities/npc';
const initialPostion = {
  "npc-1": new Vector2(255 * 3, 1220 * 3),
  "npc-2": new Vector2(344 * 3, 1284 * 3),
  "npc-3": new Vector2(136 * 3, 1056 * 3),
  "npc-4": new Vector2(112 * 3, 1008 * 3),
  "npc-5": new Vector2(448 * 3, 1120 * 3),
  "npc-6": new Vector2(904 * 3, 1300 * 3),
  "npc-7": new Vector2(984 * 3, 1396 * 3),
  "npc-8": new Vector2(1120 * 3, 1284 * 3),
  "npc-9": new Vector2(1192 * 3, 1412 * 3),
  "npc-10": new Vector2(1256 * 3, 1316 * 3)
}

function eggGirl() {
  const eggGirl = new NPC(initialPostion['npc-1'], 16, 16, 2.7, "EggGirl")
  eggGirl.path = new Path([
    new PathPoint(initialPostion['npc-1'], 2.5, 2),
    new PathPoint(new Vector2 (1020.5, 3567.5), 2.5, 2),
    new PathPoint(new Vector2(1383, 3450), 10, 2),
  ], true)

  return eggGirl
}

export function getNpcs() {
  const npcs: NPC[] = [];
  npcs.push(eggGirl())

  return npcs;
}