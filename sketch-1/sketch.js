let system;

let t = 0.025;
let j = 1;

// The initial setup function
function setup() {
  // Static canvas dimensions
  // createCanvas(800, 650); 

  // Dynamic canvas dimensions
  createCanvas(windowWidth, windowHeight);
  system = new ParticleSystem(createVector(width / 2, 600));
}

// Resize the window (asynchronously)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Ye ole' draw function necessary for p5.js to function
function draw() {
  background(239, 241, 243);
  system.addParticle();
  system.run();
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.025);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 300;
};

// Running our particle system class configutation
Particle.prototype.run = function () {
  let check;
  
  if (j % 2 === 0) {
    check = true;
  } else {
    check = false;
  }

  if (check === true) {
    t = t + 0.0002;
    var l = t.toFixed(4);
    j++;
  } else {
    t = t - 0.0001;
    var l = t.toFixed(4);
    j++;
  }

  // Verify your logic is yielding the desired values
  // console.log(check);
  // console.log(l);

  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function (l) {
  // The original sketch.js file contained the following line
  // this.velocity.add(this.acceleration);

  this.velocity.add(l);
  this.position.add(this.velocity);
  this.lifespan -= 0.5;
};

// Method to display
Particle.prototype.display = function() {
  stroke(46, 37, 50, this.lifespan);
  strokeWeight(2);
  fill(67, 97, 238, this.lifespan);
  ellipse(this.position.x, this.position.y, 20, 20);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

// Iterate over each element of the particle vector
ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, -5);
    }
  }
};
