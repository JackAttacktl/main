var canvas = document.getElementById("dots");
var ctx = canvas.getContext("2d");

class Dot
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.vx = ((Math.random() * 2) - 1) * (Math.random() * 10);
        this.vy = ((Math.random() * 2) - 1) * (Math.random() * 10);
    }
    draw()
    {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.x), 2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
        ctx.fill();
    }
}

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;





const dots = [];

var newdot = new Dot(50,50);
dots.push(newdot);
var newdot = new Dot(50,50);
dots.push(newdot);
var newdot = new Dot(50,50);
dots.push(newdot);

function getDotsInRadius(x,y,r)
{
    var inrad = [];
    dots.forEach(dot => {
        var da = Math.abs(dot.x - x)**2;
        var db = Math.abs(dot.y - y)**2;
        var dc = Math.sqrt(da + db);
        if (dc <= r)
        {
            inrad.push(dot);
        }
    });
    return inrad;
}

var lastTick = new Date() / 1000;
function render()
{
    var delta = (new Date() / 1000) - lastTick;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    dots.forEach(dot => {
        getDotsInRadius(dot.x,dot.y,100).forEach(oth => {
            if (oth != dot)
            {
                var da = Math.abs(dot.x - oth.x)**2;
                var db = Math.abs(dot.y - oth.y)**2;
                var dc = Math.sqrt(da + db);
                ctx.strokeStyle = `rgb(${((100 - dc) / 100) * 255},${((100 - dc) / 100) * 255},${((100 - dc) / 100) * 255})`;
                ctx.beginPath();
                ctx.moveTo(oth.x, oth.y);
                ctx.lineTo(dot.x, dot.y);
                ctx.stroke();
            }
        });
    });
    dots.forEach(dot => {
        var totDots = 0;
        var totDist = 0;
        getDotsInRadius(dot.x,dot.y,100).forEach(oth => {
            if (oth != dot)
            {
                var da = Math.abs(dot.x - oth.x)**2;
                var db = Math.abs(dot.y - oth.y)**2;
                var dc = Math.sqrt(da + db);
                totDist += dc;
                totDots++;
            }
        });
        var avgDist = totDist/totDots;
        dot.r = ((100 - avgDist) / 100) * 255;
        dot.g = ((100 - avgDist) / 100) * 255;
        dot.b = ((100 - avgDist) / 100) * 255;
        dot.x += dot.vx * delta;
        dot.y += dot.vy * delta;
        dot.draw()
    });
    lastTick = new Date() / 1000;
}

setInterval(render,10);