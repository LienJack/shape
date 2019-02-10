import Stuff from "./Stuff.js";

export const defaults = {
  radius: 3,
  accuracy: 6,
  fillStyle: {
    normal: "rgba(255,255,255,0.7)",
    active: "#fff",
  },
  strokeStyle: {
    normal: "rgba(0,0,0,0.3)",
    active: "rgba(0,0,0,0.7)",
  },
  lineWidth: {
    normal: 1,
    active: 1,
  }
};

export default class Handle extends Stuff {

  constructor (point, cx, cy, radius, options) {
    super(cx, cy, Object.assign({}, defaults, options));
    this.point = point;
    this.radius = radius || defaults.radius;
    this.x = cx - this.radius;
    this.y = cy - this.radius;
    this.size = this.radius * 2;
  }

  draw (ctx) {
    const { x, y, size, fillStyle, strokeStyle, lineWidth } = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
    ctx.restore();
  }

  contains (x, y) {
    const { accuracy } = this.options;
    const l = this.x - accuracy;
    const r = this.x + this.size + accuracy;
    const t = this.y - accuracy;
    const b = this.y + this.size + accuracy;
    return (l <= x) && (r >= x) && (t <= y) && (b >= y);
  }

  move (dx, dy, withoutPoint) {
    this.x += dx;
    this.y += dy;
    if (!withoutPoint) {
      this.point.move(dx, dy, true);
    }
  }

}
