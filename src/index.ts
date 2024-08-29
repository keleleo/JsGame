import { Engine } from './engine/engine';
import { Game } from './game';

(Map.prototype as any).toJSON = function () {
  return Object.fromEntries(this)
};
((canvas) => {

  if (!canvas) {
    return;
  }

  Engine.init(canvas)
  
  const game = new Game()
  
})(document.querySelector<HTMLCanvasElement>("canvas"))