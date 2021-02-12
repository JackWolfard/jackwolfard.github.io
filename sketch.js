/* The goal of this project is to create falling
 * circles from the sky which will have gravity act
 * upon them. OOP will be used to define the
 * environment.
 */

class Scene {
    
    constructor(gravity=8, deltat=1) {
        this.objs = [];
        this.gravity = gravity;
        this.deltat = deltat;
    }

    update() {
        let newObjs = [];
        for (let i = 0; i < this.objs.length; i++) {
            let c = this.objs[i];
            c.p += this.gravity * this.deltat;
            c.y += round(c.v * this.deltat);
            if (c.y - c.r <= windowHeight) {
                newObjs.push(c);
                c.draw();
            }
        }
        this.objs = newObjs.slice();
    }
}

class Mass {

    constructor(x, y, m, v, p) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.v = v;
        this.p;
    }

    set p(num) {
        this.v = num / this.m;
    }

    get p() {
        return this.m * this.v;
    }
}

class Circle extends Mass {

    constructor(x=0, y=0, col=color(0, 60), d=windowHeight / 15 >> 0, m=d/10, v=0) {
        super(x, y, m, v); 
        this.col = col;
        this.d = d;
        this.r = round(this.d / 2);
    }
   
    draw() {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.d);
    }
}

function keyPressed() {
    if (keyCode == 51) {
        lastTime = new Date();
    }
}

function keyReleased() {
    if (keyCode == 51) {
        timePassed = round((new Date() - lastTime) / 5);
        scene.objs.push(randomCircle(mouseX, mouseY, timePassed));
        cursorSize = 10;
    }
}

var lastTime;
var cursorSize = 10;
var scene = new Scene();

function randomCircle(x=random(windowWidth), y=random(windowHeight), d=random(50, 300)) {
    randColor = color(random(10, 256), random(10, 256), random(10, 256), random(150, 256));
    return new Circle(x, y, randColor, d);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
    noCursor();
    frameRate(60);
    for (let i = 0; i < 256; i++) {
        scene.objs.push(randomCircle());
    }
}

function draw() {
    if (keyIsPressed) {
        if (keyIsDown(49)) {
            for (let i = 0; i <= 5; i++) {
                scene.objs.push(randomCircle()); 
            }
        }
        if (keyIsDown(50)) {
            scene.objs.push(randomCircle(mouseX, mouseY));
        }
        if (keyIsDown(51)) {
            cursorSize = round((new Date() - lastTime) / 5);
        }
    }
    background(255);
    fill(0, 50);
    ellipse(mouseX, mouseY, cursorSize);
    scene.update();
}
