
import Stuff from "./Stuff.js";
import Point from "./Point.js";

export const defaults = {
  fillStyle: {
    normal: "rgba(255,0,0,0.2)",
    active: "rgba(0,255,0,0.2)",
  },
  strokeStyle: {
    normal: "rgba(255,0,0,0.3)",
    active: "rgba(0,255,0,0.3)",
  },
  lineWidth: {
    normal: 1,
    active: 1,
  },
};

export default class Shape extends Stuff {

  constructor (points = [], options) {
    super(0, 0, Object.assign({}, defaults, options));
    this.id = Math.random().toString(36).substr(2, 15);
    this.points = points.map((point, index) => {
      return new Point(...point, index, this.options.noHandle);
    });
  }

  validate () {
    return this.points.length > 0;
  }

  contains (x, y) {}

  /**
   * @from lien
   */
  getArea () {
    const { points } = this;
    const { length } = points;
    let area = 0;
    for (let i = 0; i < length; i++) {
      let j = (i + 1) % length;
      area += points[i].x * points[j].y;
      area -= points[i].y * points[j].x;
    }
    return Math.abs(area / 2);
  }

  addPoint (x, y) {
    const point = new Point(x, y, this.points.length, this.options.noHandle);
    this.points.push(point);
  }

  // delPoint (index) {
  //   this.points.splice(index, 1);
  // }

  eachPoints (handler) {
    const points = this.points;
    for (let index = 0, point = null; point = points[index]; index++) {
      handler(point, index);
    }
  }

  draw (ctx, method) {
    const { fillStyle, strokeStyle, lineWidth, options } = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    method && method();
    !options.noClose && ctx.closePath();
    !options.noFill && ctx.fill();
    !options.noStroke && ctx.stroke();
    ctx.restore();
    this.drawHandles(ctx);
  }

  drawHandles (ctx) {
    if (!this.options.noHandle) {
      this.eachPoints(({ handle }, index) => {
        handle.draw(ctx);
      });
    }
  }

  move (dx, dy) {
    super.move(dx, dy);
    this.eachPoints(point => {
      point.move(dx, dy);
    });
  }

  resize (dx, dy) {
    this.activedPoint.move(dx, dy);
  }

  // @todo Rebuild
  checkActive (x, y) {
    this.activedPoint = null;
    this.eachPoints(point => {
      point.handle.inactive();
      if (point.handle.contains(x, y)) {
        this.activedPoint = point;
        point.handle.active();
      }
    })
    return this.activedPoint || this.contains(x, y);
  }
}
