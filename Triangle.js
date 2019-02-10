export default function Triangle (x, y, x2, y2, x3, y3, fill, stroke, strokeWeight) {
  this.x = x;
  this.y = y;
  this.x2 = x2;
  this.y2 = y2;
  this.x3 = x3
  this.y3 = y3;
  this.fill = fill || "#ffffff";
  this.stroke = stroke || "#000000";
  this.strokeWeight = strokeWeight || 1;

  this.type = "TRIANGLE";
}

Triangle.prototype.contains = function (mx, my) {
  var vertx=[this.x, this.x2, this.x3];
  var verty=[this.y, this.y2, this.y3];
  var i, j, c = false;
    for( i = 0, j = 3-1; i < 3; j = i++ ) {
        if ( ( ( verty[i] > my ) != ( verty[j] > my ) ) &&
            ( mx < ( vertx[j] - vertx[i] ) * ( my - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
                c = !c;
        }
    }
  return c;
}

Triangle.prototype.draw = function (ctx, optionalColor, colorStroke, strokeWeight) {
  if (this.fill!=="none") {
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);
    ctx.lineTo(this.x,this.y);
    ctx.closePath();
    ctx.fill();
  }
  if (this.stroke!=="none") {
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.strokeWeight;
    ctx.stroke();
  }
}
