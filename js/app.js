
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {

    if (this.x > ctx.canvas.width) {
        this.x = -300 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }
    // check the distance of an enemy relative to player
    this.xDistSq = Math.pow(player.x - this.x, 2);
    this.yDistSq = Math.pow(player.y - this.y, 2);
    this.sqrtDist = Math.sqrt(this.xDistSq + this.yDistSq);
    // if distance smaller then _ reset players position
    if (this.sqrtDist < 45) {
        player.x = 202;
        player.y = 400;
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};
Player.prototype.update = function(dt) {
    
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(direction) {
    
    let modal = document.querySelector('.modal');
    if (direction === 'left' && this.x > 100) {
        this.x -= 101;
    } else if (direction === 'up' && this.y > 0) {
        if ( this.y > 100 ) {
            this.y -= 83;
        } else {
            // if this.y < 100 display modal
            modal.style.display = "block";
        }
    } else if (direction === 'right' && this.x < 400) {
        this.x += 101;
    } else if (direction === 'down' && this.y < 400) {
        this.y += 83;
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const enemyStartPositions = [55, 140,230];
const player = new Player(202, 400,'images/char-boy.png');
const allEnemies = enemyStartPositions.map((y, index) => {
    return new Enemy((-100 * (index + 1)), y)
});