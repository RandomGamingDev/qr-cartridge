var c = document.createElement("canvas");
c.width = 200;
c.height = 200;
document.body.appendChild(c);
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
