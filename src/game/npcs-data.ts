import { Path, PathPoint } from '../engine/models/Path';
import { Vector2 } from '../engine/models/vector2';
import { NPC } from './entities/npc';

function eggGirl() {
  const eggGirl = new NPC(new Vector2(1981, 1677), 16, 16, 3, "EggGirl")
  eggGirl.path = new Path([
    new PathPoint(new Vector2(1774, 1566), 2.5, 2),
    new PathPoint(new Vector2(2214, 1542), 10, 2),
    new PathPoint(new Vector2(2553, 1620), 6, 2),
  ], true)

  return eggGirl
}

export function getNpcs() {
  const npcs:NPC[] = [];
  npcs.push(eggGirl())

  return npcs;
}