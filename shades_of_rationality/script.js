let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shade;
grid = 15;
size = 70;
start = {x: window.innerWidth/2 - (grid*size)/2, y: window.innerHeight/2 - (grid*size)/2};

// Fill with gradient

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function draw(){
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for(x=0;x<grid;x++){
		y = getRandomInt(0, 10);
		length = getRandomInt(0, grid);
		for(y;y<length;y++){
			let direction = getRandomInt(1,4);
			if(direction == 1){
				shade = ctx.createLinearGradient(x*size + start.x, y*size + start.y, x*size+size + start.x, y*size + start.y);
			}
			if(direction == 2){
				shade = ctx.createLinearGradient(x*size + start.x, y*size + start.y, x*size + start.x, y*size+size + start.y);
			}
			if(direction == 3){
				shade = ctx.createLinearGradient(x*size+size + start.x, y*size + start.y, x*size + start.x, y*size + start.y);
			}
			if(direction == 4){
				shade = ctx.createLinearGradient(x*size + start.x, y*size+size + start.y, x*size + start.x, y*size + start.y);
			}
			shade.addColorStop(0, "black");
			shade.addColorStop(1, "white");
			ctx.fillStyle = shade;
			ctx.fillRect(x*size + start.x, y*size + start.y + getRandomInt(0, size), size + getRandomInt(0, size), size + getRandomInt(0, size)); 
		}
	}
}

setInterval(draw, 1000);

/*for(x=0;x<grid;x++){
	for(y=0;y<grid;y++){
		ctx.strokeStyle = "blue";
		ctx.strokeRect(x*size, y*size, size, size);
	}
}*/