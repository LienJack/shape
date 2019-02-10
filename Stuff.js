export const defaults = {
  fillStyle: { normal: "#fff" },
  strokeStyle: { normal: "#333"},
  lineWidth: { normal: 1 },
};

export default class Stuff {
  constructor (x, y, options) {
    this.options = Object.assign({}, defaults, options);
    this.x = x || 0;
    this.y = y || 0;
    this.actived = false;
    this.style("normal");
  }
  style (status = "normal") {
    const { fillStyle, strokeStyle, lineWidth } = this.options;
    this.fillStyle = fillStyle[status] || fillStyle["normal"];
    this.strokeStyle = strokeStyle[status] || strokeStyle["normal"];
    this.lineWidth = lineWidth[status] || lineWidth["normal"];
  }
  move (dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  moveTo (x, y) {
    this.move(x - this.x, y - this.y);
  }
  active () {
    this.actived = true;
    this.style("active");
  }
  inactive () {
    this.actived = false;
    this.style("normal");
  }
}
