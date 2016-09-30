//Entity superclass
var Entity = function(col, row, spriteUrl){
    this.BLOCK_HEIGHT = 83;
    this.BLOCK_WIDTH = 101;
    this.col = col;
    this.row = row;
    this.x = this.col * this.BLOCK_WIDTH;
    this.y = this.row * this.BLOCK_HEIGHT - this.BLOCK_HEIGHT/2;

    this.sprite = spriteUrl;
}

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check collision with right edges
Entity.prototype.checkCollision = function(){
    if (this.x >= 5 * this.BLOCK_WIDTH){
        return false;
    }

    return true;
};

//Update the entitys's position
Entity.prototype.update = function(){
    this.x = this.col * this.BLOCK_WIDTH;
    this.y = this.row * this.BLOCK_HEIGHT - this.BLOCK_HEIGHT/2;
}

//reset status of this entity
Entity.prototype.reset= function(){
    this.x = getRandomInt(0, 3)* this.BLOCK_WIDTH;
    this.y = this.row * this.BLOCK_HEIGHT - this.BLOCK_HEIGHT/2;
}


// Enemies our player must avoid - Subclass
var Enemy = function(col, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Entity.call(this, col, row, 'images/enemy-bug.png');
    this.speed = speed;
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.checkCollision()) {
        this.x = this.x + this.speed*dt;
        this.col = Math.floor(this.x / this.BLOCK_WIDTH);
    }
    else{
        this.reset();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    Entity.call(this, 2, 5, 'images/char-boy.png');
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;



Player.prototype.update = function(){
    if (this.checkCollision()){
        this.x = this.col * this.BLOCK_WIDTH;
        this.y = this.row * this.BLOCK_HEIGHT - this.BLOCK_HEIGHT/2;
    }
};


Player.prototype.reset = function(){
    this.col = 2;
    this.row = 5;
    this.x = this.col * this.BLOCK_WIDTH;
    this.y = this.row * this.BLOCK_HEIGHT - this.BLOCK_HEIGHT/2;
}

Player.prototype.handleInput = function(key){
    if(key === 'left' && this.col > 0){
        this.col--;
    }
    else if(key === 'right' && this.col < 4){
        this.col++;
    }
    else if(key === 'up' && this.row > 0){
        this.row--;
    }
    else if(key === 'down' && this.row < 5){
        this.row++;
    }
}


function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i = 0;i < 4;i++){
    allEnemies.push(new Enemy(getRandomInt(0, 3), getRandomInt(1, 3), 50));
}

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});