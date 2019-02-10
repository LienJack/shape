import Handle from "./Handle.js"

export default class Point {
  constructor (x, y, index, noHandle) {
    this.x = x;
    this.y = y;
    this.index = index;
    if (!noHandle) {
      this.handle = new Handle(this, x, y);
    }
  }
  move (dx, dy, withoutHandle) {
    this.x += dx;
    this.y += dy;
    if (this.handle && !withoutHandle) {
      this.handle.move(dx, dy, true);
    }
  }
  moveTo (x, y) {
    this.move(x - this.x, y - this.y);
  }
}
