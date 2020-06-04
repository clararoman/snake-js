//to add: food changes location and grow when you eat + you die when you hit yourself or the wall

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var score = 0;
var foodEaten = 0;
ctx.font = "bold 64px courier";
ctx.textAlign = "center";

var Blubb = function(x,y){
	this.x = x;
	this.y = y;
	this.draw = function(){
			ctx.fillStyle = "rgba(255,0,0,0.5)";
			ctx.fillRect(this.x, this.y, 32, 32);
	}
}


var snek = {
	x : 32,
	y : 32,
	blubbar: [],
	axis: "x",
	direction : 1,
	size: 0,
	speed: 1,
	draw : function(){
		ctx.fillStyle = "red";
		//fills a square according to the snakes x and y value, and has the length of the snake objects size, and the height is always 32
		ctx.fillRect(this.x, this.y, 32, 32);
	},
	move : function(){
		//takes the current axis, adds 32 (one square) and multiplies it by the direction (-1 or 1), which can result in eather -32 or 32 (moving up/down or left/right)
		if(this.hitWall(snek.x,snek.y) == false){
			
			blubbar = this.blubbar;
			
			this[this.axis] += 32 * this.direction;

			if(snek.size > 0){
				for (var i = 0; i < blubbar.length; i++) {
					blubbar[i].draw();
					while(blubbar.length > snek.size){
						blubbar.pop();
					}
				}
			}

			blubbar.push(new Blubb(snek.x, snek.y));
			var popped = blubbar.pop();
			blubbar.unshift(popped);

			//if the snake eats the food
			if(this.x === food.x && this.y === food.y){
				food.x = Math.floor(Math.random()*20)*32;
				food.y = Math.floor(Math.random()*20)*32;
				snek.size++;
				foodEaten++;

				if(foodEaten % 3 == 0){
					this.speed += 0.15;
					console.log("SPEED: " + this.speed);
				}
			}
		
			if(this.hitBody(this.x,this.y)){
				while(blubbar.length > hitBlubb){
					blubbar.pop();
					snek.size--;
          if(snek.size < 0){
            snek.size = 0;
          }
				}
			}	
		}
	},
	hitWall: function(x,y){
		if(x < 0 || x > 639 || y < 0 || y > 639){
			return true;
		}else{
			return false;
		}
	},
	hitBody: function(x,y){
		for (var i = 1; i < blubbar.length; i++) {
			if (x == blubbar[i].x && y == blubbar[i].y) {
				hitBlubb = i;
				return true;
			}
		}
	}
};

var food = {
	x : Math.floor(Math.random()*20)*32,
	y : Math.floor(Math.random()*20)*32,
	img : new Image(),
	draw : function(){
		while(this.colission(this.x, this.y)){ // while colission is true (if food spawns in same place), generate a new x and y value for the food, then draw it
			this.x = Math.floor(Math.random()*20)*32;
			this.y = Math.floor(Math.random()*20)*32;
		}
		ctx.fillStyle = "rgb(0,0,255)";
    ctx.fillRect(this.x, this.y, 32, 32);
	},
	init : function (){
		this.img.src = "https://github.com/clararoman/snake/blob/master/food.png?raw=true";
	},
	colission: function(x,y){ //function to make sure that the food is not drawn under the body of the snake
		blubbar = snek.blubbar;
		for (var i = 0; i < blubbar.length; i++) {
			if(x == blubbar[i].x && y == blubbar[i].y){
				console.log("FOOD COLISSION");
				return true;
			}
		}
	}
};

food.init();

// iife:
(function update(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	food.draw();
	snek.move();
	snek.draw();
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	scoreText = ctx.fillText("Score: "+snek.size, canvas.width/2, canvas.height/2);
	if(snek.hitWall(snek.x,snek.y)){
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.font = "bold 50px courier";
		scoreText = ctx.fillText("Game over. Score: "+snek.size, canvas.width/2, canvas.height/2);
	}
	ID = setTimeout(update, 300/snek.speed);
})();

document.addEventListener("keydown",function(event){
	if(event.key === "ArrowLeft" || event.key === "ArrowRight"){
		snek.axis = "x";
	}else{
		snek.axis = "y";
	}
	if(event.key === "ArrowRight" || event.key === "ArrowDown"){
		snek.direction = 1;
	}else{
		snek.direction = -1;
	}
  event.preventDefault();
});