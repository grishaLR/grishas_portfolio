const { createCanvas } = require('canvas');

HTMLCanvasElement.prototype.getContext = function (contextId, ...args) {
  if (contextId === '2d' || contextId === 'webgl' || contextId === 'webgl2') {
    return createCanvas(this.width, this.height).getContext(contextId, ...args);
  }
  return null;
};
