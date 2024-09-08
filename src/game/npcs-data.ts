import { Vector2 } from '../engine/models/vector2';
import { NPC } from './entities/npc';
const initialPostion = {
  "npc-1": new Vector2(520 * 3 - (16 * 2.7 / 2), 480 * 3),
  "npc-2": new Vector2(568 * 3 - (16 * 2.7 / 2), 480 * 3),
  "npc-3": new Vector2(472 * 3 - (16 * 2.7 / 2), 368 * 3),
  "npc-4": new Vector2(568 * 3 - (16 * 2.7 / 2), 368 * 3),
  "npc-5": new Vector2(648 * 3 - (16 * 2.7 / 2), 352 * 3),
  "npc-6": new Vector2(632 * 3 - (16 * 2.7 / 2), 448 * 3),
  "npc-7": new Vector2(728 * 3 - (16 * 2.7 / 2), 448 * 3),
  "npc-8": new Vector2(872 * 3 - (16 * 2.7 / 2), 448 * 3),
  "npc-9": new Vector2(824 * 3 - (16 * 2.7 / 2), 608 * 3),
  "npc-10": new Vector2(864 * 3 - (16 * 2.7 / 2), 288 * 3),
  "npc-11": new Vector2(984 * 3 - (16 * 2.7 / 2), 320 * 3),
  "npc-12": new Vector2(936 * 3 - (16 * 2.7 / 2), 448 * 3),
  "npc-14": new Vector2(1016 * 3 - (16 * 2.7 / 2), 448 * 3),
  "npc-init": new Vector2(1797 , 1665)
}

function eggGirl() {
  const eggGirl = new NPC(initialPostion['npc-1'], 16, 16, 2.7, "EggGirl")
  eggGirl.setDialogText(
    "Olá, aventureiro! Sempre que bater aquela fome, sinta-se à vontade para passar aqui."
  );
  return eggGirl
}
function eggBoy() {
  const eggBoy = new NPC(initialPostion['npc-2'], 16, 16, 2.7, "EggBoy")
  eggBoy.setDialogText(
    "Saudações, viajante! Se tiver um tempo livre, passe aqui para uma visita. Meu lar é sempre aberto para amigos e novos conhecidos."
  );
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
  villager.setDialogText(
    "Você sente esse frio na espinha? O silêncio aqui é diferente... É como se as almas daqueles que partiram ainda estivessem por perto.",
    "Dizem que, quando a lua cheia aparece, os portões do cemitério rangem por conta própria."
  )
  return villager
}
function sorcererKnigh() {
  const npc = new NPC(initialPostion["npc-init"], 16, 16, 2.7, "Knight")
  npc.setDialogText(
    "Bem-vindo! Este é um projeto experimental, criado para testar códigos e ideias."
  )
  return npc
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
    sorcererKnigh(),
  )

  return npcs;
}