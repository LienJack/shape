export default function Bezier(x, y, x2, y2, x3, y3, x4, y4, fill, stroke, strokeWeight) {
  this.x = x;
  this.y = y;
  this.x2 = x2;
  this.y2 = y2;
  this.x3 = x3;
  this.y3 = y3;
  this.x4 = x4;
  this.y4 = y4;

  this.fill = fill || "#ffffff";
  this.stroke = stroke || "#000000";
  this.strokeWeight = strokeWeight || 1;

  this.type = "BEZIER";
}

Bezier.prototype.contains = function (mx, my) {
  var maxX = Math.max(this.x, this.x2, this.x3, this.x4);
  var minX = Math.min(this.x, this.x2, this.x3, this.x4);
  var maxY = Math.max(this.y, this.y2, this.y3, this.y4);
  var minY = Math.min(this.y, this.y2, this.y3, this.y4);

  return mx <= maxX && mx >= minX && my <= maxY && my >= minY;
}

Bezier.prototype.draw = function (ctx, optionalColor, colorStroke, strokeWeight) {
  if (this.stroke=="none") {
    this.stroke="#000000";
  }
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.strokeWeight;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
    ctx.stroke();

  if (this.fill!=="none") {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
}
