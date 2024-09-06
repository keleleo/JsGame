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
    new PathPoint(initialPostion['npc-1'], 0, 2),
    new PathPoint(new Vector2(1020.5, 3567.5),4, 2),
    new PathPoint(new Vector2(1300.8 , 3316.2), 10, 2),
  ], true)
  return eggGirl
}
function eggBoy() {
  const eggBoy = new NPC(initialPostion['npc-2'], 16, 16, 2.7, "EggBoy")
  eggBoy.path = new Path([
    new PathPoint(initialPostion['npc-2'], 0, 2),
    new PathPoint(new Vector2(1152 , 3790.5), 0, 2),
    new PathPoint(new Vector2(1084.5 , 3547.5), 2, 2),
    new PathPoint(new Vector2(1387.2 , 3369), 10, 2),
  ], true)
  return eggBoy
}
function fighterWhite() {
  const fighterWhite = new NPC(initialPostion['npc-3'], 16, 16, 2.7, "FighterWhite")
  return fighterWhite
}
function maskFrog() {
  const maskFrog = new NPC(initialPostion['npc-4'], 16, 16, 2.7, "MaskFrog")
  return maskFrog
}
function master() {
  const master = new NPC(initialPostion['npc-5'], 16, 16, 2.7, "Master")
  return master
}
function oldMan2() {
  const oldMan2 = new NPC(initialPostion['npc-6'], 16, 16, 2.7, "OldMan2")
  return oldMan2
}
function samuraiRed() {
  const samuraiRed = new NPC(initialPostion['npc-7'], 16, 16, 2.7, "SamuraiRed")
  return samuraiRed
}
function sorcererOrange() {
  const sorcererOrange = new NPC(initialPostion['npc-8'], 16, 16, 2.7, "SorcererOrange")
  return sorcererOrange
}
function villager() {
  const villager = new NPC(initialPostion['npc-9'], 16, 16, 2.7, "Villager")
  return villager
}
function caveman() {
  const caveman = new NPC(initialPostion['npc-10'], 16, 16, 2.7, "Caveman")
  return caveman
}
export function getNpcs() {
  const npcs: NPC[] = [];
  npcs.push(
    eggGirl(),
    eggBoy(),
    fighterWhite(),
    maskFrog(),
    master(),
    oldMan2(),
    samuraiRed(),
    sorcererOrange(),
    villager(),
    caveman(),
  )

  return npcs;
}