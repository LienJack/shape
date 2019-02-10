import Shape from "./Shape.js";

export default class Polygon extends Shape {

  constructor (x, y, options = {}) {
    const points = Array.isArray(x) ? x : [[x, y]];
    super(points, options);
    this.type = "polygon";
  }

  validate () {
    return this.points.length > 2;
  }
  contains (x, y) {
    const { points } = this;
    let result = false;
    let length = points.length;
    for (let i = 0, j = length - 1; i < length; j = i, i++) {
      let { x: x1, y: y1 } = points[i];
      let { x: x2, y: y2 } = points[j];
      if ((x1 === x && y1 === y) || (x2 === x && y2 === y)) {
        return true;
      }
      if ((y1 < y && y2 >= y) || (y1 >= y && y2 < y)) {
        let tx = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
        if (tx === x) { return true; }
        if (tx > x) { result = !result; }
      }
    }
    return result;
  }

  draw (ctx) {
    super.draw(ctx, () => {
      this.eachPoints(({ x, y }, index) => {
        index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
    });
  }

  drawStart () {
    this.lineWidth = 3;
    this.options.noClose = true;
    this.options.noFill = true;
  }

  drawEnd () {
    this.lineWidth = 1;
    this.options.noClose = false;
    this.options.noFill = false;
  }

}
