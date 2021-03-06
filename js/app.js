// Enemies our player must avoid
let Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  //we want the heads of each enemy to appear first
  if (this.x >= 505) {
    this.x = -60;
    this.speed = 100 + Math.floor(Math.random() * 100 + 1);
  }
  //collision when the Enemies hit the player
  if (
    this.x < player.x + 60 &&
    this.x + 60 > player.x &&
    this.y < player.y + 40 &&
    this.y + 40 > player.y
  ) {
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

let Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-princess-girl.png";
};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(dt) {
  switch (true) {
    case this.x > 400:
      this.x = 400;
      break;
    case this.x < 0:
      this.x = 0;
      break;
    case this.y < 0:
      this.y = 0;
      setTimeout(() => {
        player.reset();
      }, 100);
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Handle the Input sow so when the arrowKeyPress did matched the player will move.
Player.prototype.handleInput = function(arrowKeyPress) {
  switch (arrowKeyPress) {
    case "up":
      this.y -= 84;
      break;
    case "down":
      this.y += 84;
      break;
    case "right":
      this.x += 101;
      break;
    case "left":
      this.x -= 101;
  }
};
// return the player to the default position.
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [
  new Enemy(0, 60, 50),
  new Enemy(0, 140, 50),
  new Enemy(0, 225, 50)
];
// Place the player object in a variable called player
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
