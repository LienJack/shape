import Shape from "./Shape.js";

const defaults = {
  minSize: 5,
};

function getRectPoints (x, y, w, h) {
  return [
    [x,     y    ], [x + w, y    ],
    [x + w, y + h], [x    , y + h],
  ];
}
function getRectParams (points) {
  const { 0: [x, y], 2: [x2, y2] } = points;
  const w = x2 - x;
  const h = y2 - y;
  return { x, y, w, h };
}

export default class Rect extends Shape {

  constructor (x = 0, y = 0, w = 0, h = 0, options = {}) {
    let points, params;
    if (Array.isArray(x)) {
      params = getRectParams(x);
      points = x;
    } else {
      params = { x, y, w, h };
      points = getRectPoints(x, y, w, h);
    }
    super(points, Object.assign({}, defaults, options));
    this.type = "rect";
    Object.assign(this, params);
  }

  validate () {
    const { w, h, options: { minSize } } = this;
    return w >= minSize && h >= minSize;
  }

  contains (x, y) {
    return (this.x <= x) && (this.x + this.w >= x) &&
           (this.y <= y) && (this.y + this.h >= y);
  }

  draw (ctx) {
    const { x, y, w, h } = this;
    super.draw(ctx, () => {
      ctx.rect(x, y, w, h);
    });
  }

  resize (dx, dy) {
    const { x, y, w, h, points, activedPoint, options: { minSize } } = this;
    let _x = x;
    let _y = y;
    let _w = w;
    let _h = h;
    switch (activedPoint.index) {
      case 0: _x += dx; _y += dy; _w -= dx; _h -= dy; break; // ����
      case 1:           _y += dy; _w += dx; _h -= dy; break; // ����
      case 2:                     _w += dx; _h += dy; break; // ����
      case 3: _x += dx;           _w -= dx; _h += dy; break; // ����
    }
    if ((_w < w && _w < minSize) || (_h < h && _h < minSize)) { return; } // @todo optimize interactive
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    switch (activedPoint.index) {
      case 0: points[3].move(dx, 0); points[1].move(0, dy); break; // ����
      case 1: points[2].move(dx, 0); points[0].move(0, dy); break; // ����
      case 2: points[1].move(dx, 0); points[3].move(0, dy); break; // ����
      case 3: points[0].move(dx, 0); points[2].move(0, dy); break; // ����
    }
    activedPoint.move(dx, dy);
  }

}
