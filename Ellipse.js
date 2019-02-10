import Shape from "./Shape.js";

const defaults = {
  minSize: 10,
};

function getEllipsePoints (x, y, rx, ry) {
  return [
    [x, y - ry], [x + rx, y],
    [x, y + ry], [x - rx, y],
  ];
}
function getRectPoints (x, y, rx, ry) {
  return [
    [x - rx, y - ry],
    [x + rx, y - ry],
    [x + rx, y + ry],
    [x - rx, y + ry],
  ];
}
function getEllipseParams (points) {
  const [[x1, y1], [x2, y2]] = points;
  const x = x1;
  const y = y2;
  const rx = x2 - x1;
  const ry = y2 - y1;
  return { x, y, rx, ry };
}
function getRectParams (points) {
  const { 0: [x1, y1], 2: [x2, y2] } = points;
  const rx = (x2 - x1) / 2;
  const ry = (y2 - y1) / 2;
  const x = x1 + rx;
  const y = y1 + ry;
  return { x, y, rx, ry };
}

export default class Ellipse extends Shape {

  constructor (x = 0, y = 0, rx = 0, ry = 0, options = {}) {
    let points, params;
    if (Array.isArray(x)) {
      params = y ? getRectParams(x) : getEllipseParams(x);
      points = y ? getEllipsePoints(...Object.values(params)): x;
    } else {
      params = { x, y, rx, ry };
      points = getEllipsePoints(x, y, rx, ry);
    }
    super(points, Object.assign({}, defaults, options));
    this.type = "ellipse";
    Object.assign(this, params);
  }

  validate () {
    const { rx, ry, options: { minSize } } = this;
    return rx >= minSize && ry >= minSize;
  }

  getRectPoints () {
    let { x, y, rx, ry } = this;
    return getRectPoints(x, y, rx, ry);
  }

  draw (ctx) {
    const { x, y, rx, ry} = this;
    super.draw(ctx, () => {
      ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
    });
  }

  contains (x, y) {
    return Math.pow(x - this.x, 2) / Math.pow(this.rx, 2) +
           Math.pow(y - this.y, 2) / Math.pow(this.ry, 2) <= 1;
  }

  // @todo implement
  resize (dx, dy) {
    const { x, y, rx, ry, points, activedPoint, options: { minSize } } = this;
    let _x = x;
    let _y = y;
    let _rx = rx;
    let _ry = ry;
    switch (activedPoint.index) {
      case 0: _ry -= dy; break; // 上
      case 1: _rx += dx; break; // 右
      case 2: _ry += dy; break; // 下
      case 3: _rx -= dx; break; // 左
    }
    if ((_rx < rx && _rx < minSize) || (_ry < ry && _ry < minSize)) { return false; }
    this.rx = _rx;
    this.ry = _ry;
    switch (activedPoint.index) {
      case 0: activedPoint.move(0, dy); points[2].move(0, -dy); break; // 上
      case 1: activedPoint.move(dx, 0); points[3].move(-dx, 0); break; // 右
      case 2: activedPoint.move(0, dy); points[0].move(0, -dy); break; // 下
      case 3: activedPoint.move(dx, 0); points[1].move(-dx, 0); break; // 左
    }
    return true;
  }

}
