import Ellipse from "./Ellipse.js";

export default class Circle extends Ellipse {

  constructor (x = 0, y = 0, r = 0, options = {}) {
    super(x, y, r, r);
    this.type = "circle";
  }

  resize (dx, dy) {
    if (!super.resize(dx, dy)) { return false; }
    const { rx, ry, points, activedPoint } = this;
    switch (activedPoint.index) {
      case 0: this.rx = ry; points[1].move(-dy, 0); points[3].move(dy, 0);  break; // 上
      case 1: this.ry = rx; points[0].move(0, -dx); points[2].move(0, dx);  break; // 右
      case 2: this.rx = ry; points[1].move(dy, 0);  points[3].move(-dy, 0); break; // 下
      case 3: this.ry = rx; points[0].move(0, dx);  points[2].move(0, -dx); break; // 左
    }
    this.r = this.rx = this.ry;
    return true;
  }

}
