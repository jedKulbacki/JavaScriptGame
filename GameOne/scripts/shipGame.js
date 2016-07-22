var playerShip = new Object();
playerShip.X = 310;
playerShip.Y = 400;
playerShip.width = 15;
playerShip.height = 20;
playerShip.color = '#00f';

var projectileVelocity = 15;
var projectileColor = '#f0f';
var projectileSize = 4;
var playerProjectileOne = makeProjectile(0,0,0);

var playerProjectileTwo = makeProjectile(0,0,0);

var countToSecond = 0;

var c=document.getElementById("myCanvas");
var ship=c.getContext("2d");

var myTimer = setInterval(function(){reDrawShip(ship)},50);
  
function moveSpaceShip()
{
	var keyHit;
	if(window.event)
	{
		keyHit = event.keyCode;
	}
	else if(event.which)
	{
		keyHit = event.which;
	}	
	switch (keyHit)
	{
		case 32:			
			if(playerProjectileOne.inPlay == 0)
			{
				playerProjectileOne.inPlay = 1;
				playerProjectileOne.centerX = playerShip.X;
				playerProjectileOne.centerY = playerShip.Y;
			}
			else if(playerProjectileTwo.inPlay == 0)
			{
				playerProjectileTwo.inPlay = 1;
				playerProjectileTwo.centerX = playerShip.X;
				playerProjectileTwo.centerY = playerShip.Y;
			}
			break;
		case 37:
			if(playerShip.X > 0)
			{
				playerShip.X -= 10;
			}
			break;
		case 38:
			break;
		case 39:
			if(playerShip.X < 640)
			{
				playerShip.X += 10;
			}
			break;
		case 40:
			break;
	}

}

function reDrawShip(shipOne)
{
if((opposition.length < 1) && (oppShip.projectiles.length < 1))
{
	alert("Player Wins");
	window.location.reload();	
}
//Reset Canvas
shipOne.clearRect(0,0,640,480);
//Set up for player ship
shipOne.fillStyle   =  playerShip.color;
shipOne.strokeStyle = '#000';
shipOne.lineWidth   = 2;

// Draw a iso triangle.
shipOne.beginPath();
shipOne.moveTo(playerShip.X, playerShip.Y);
shipOne.lineTo(playerShip.X + playerShip.width, playerShip.Y + playerShip.height);
shipOne.lineTo(playerShip.X - playerShip.width , playerShip.Y + playerShip.height);
shipOne.lineTo(playerShip.X, playerShip.Y);
shipOne.closePath();
shipOne.fill();
shipOne.stroke();

//need to use move to command
//projectiles, friendly
shipOne.fillStyle   =  projectileColor;
shipOne.lineWidth   = 2;
shipOne.beginPath();
if(playerProjectileOne.inPlay == 1)
{
	var hitIndex = isHitSquare(playerProjectileOne, projectileSize, opposition, oppShip.radius);
	if(hitIndex !== -1)
	{
		var newProj = makeProjectile(playerProjectileOne.centerX,playerProjectileOne.centerY, 1);
		oppShip.projectiles.push(newProj);
	}
	shipOne.moveTo(playerProjectileOne.centerX + projectileSize, playerProjectileOne.centerY);
	shipOne.arc(playerProjectileOne.centerX,playerProjectileOne.centerY,projectileSize,0,2*Math.PI);
	playerProjectileOne.centerY -= projectileVelocity;
	shipOne.fill();
	shipOne.stroke();
	inBounds(playerProjectileOne);
}

if(playerProjectileTwo.inPlay == 1)
{
	var hitIndex = isHitSquare(playerProjectileTwo, projectileSize, opposition, oppShip.radius);
	if(hitIndex !== -1)
	{
		var newProj = makeProjectile(playerProjectileTwo.centerX,playerProjectileTwo.centerY, 1);
		oppShip.projectiles.push(newProj);
	}
	shipOne.moveTo(playerProjectileTwo.centerX + projectileSize, playerProjectileTwo.centerY);
	shipOne.arc(playerProjectileTwo.centerX,playerProjectileTwo.centerY,projectileSize,0,2*Math.PI);
	playerProjectileTwo.centerY -= projectileVelocity;
	shipOne.fill();
	shipOne.stroke();
	inBounds(playerProjectileTwo);
}
//shipOne.closePath();

if(oppShip.projectiles.length > 0)
{
	var pIndex;
	
	for(pIndex = 0; pIndex < oppShip.projectiles.length; pIndex++)
	{
		console.log("oppship is " + oppShip.projectiles[pIndex].centerX);
		var isGameOver = isPlayerHit(playerShip, 10, oppShip.projectiles[pIndex], projectileSize);
		if(isGameOver === 0 )
		{
			window.location.reload();
		}
		shipOne.moveTo(oppShip.projectiles[pIndex].centerX + projectileSize, oppShip.projectiles[pIndex].centerY);
		shipOne.arc(oppShip.projectiles[pIndex].centerX,
			oppShip.projectiles[pIndex].centerY,projectileSize,0,2*Math.PI);
		oppShip.projectiles[pIndex].centerY += projectileVelocity;
		shipOne.fill();
		shipOne.stroke();
		var visible = inBounds(oppShip.projectiles[pIndex]);
		if(visible === 0)
		{
			oppShip.projectiles.splice(pIndex,1);
		}
	}
}

shipOne.closePath();

shipOne.fillStyle = oppShip.color;
shipOne.beginPath()

//shipOne.fillRect(opposition[0].X, opposition[0].Y, oppShip.width, oppShip.height);
//shipOne.moveTo(opposition[1].X, opposition[1].Y);
//shipOne.fillRect(opposition[1].X, opposition[1].Y, oppShip.width, oppShip.height);

//replace with for or while loop
countToSecond += 50;
countToSecond %= 500;
var currentShip;
for(currentShip = 0; currentShip < opposition.length; currentShip++)
{
	shipOne.fillRect(opposition[currentShip].X, opposition[currentShip].Y, oppShip.width, oppShip.height);
	
	if(countToSecond == 0)
	{
		var oppPos = moveOpponent(oppShip.limitX, oppShip.limitY, opposition[currentShip].X, opposition[currentShip].Y);
		opposition[currentShip].X = oppPos.X;
		opposition[currentShip].Y = oppPos.Y;
		if((oppPos.X % 4) == 0)
		{
			var newProj = makeProjectile(oppPos.X,oppPos.Y, 1);
			oppShip.projectiles.push(newProj);
		}
		
	}
	
}

shipOne.closePath();
}

function inBounds(projectile)
{
	if (projectile.centerX < 0 || projectile.centerX > windowWidth || projectile.centerY < 0 || projectile.centerY > windowHeight)
	{
		projectile.inPlay = 0;
		return 0;
	}
	return 1;
}