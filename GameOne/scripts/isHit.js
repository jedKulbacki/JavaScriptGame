function isHitCircle(objectOne, objectRadius, opponents, oppRadius)
{
	var currentOpp;
	for(currentOpp = 0; currentOpp < opponents.length; currentOpp++)
	{
		var oppCenterX = opponents[currentOpp].X + oppRadius;
		var oppCenterY = opponents[currentOpp].Y - oppRadius;
		console.log("oppCenterX " + oppCenterX + " opps x " + opponents[currentOpp].X);
		console.log("oppCenterY " + oppCenterY + " opps y " + opponents[currentOpp].Y);
		console.log("object center x is " + objectOne.centerX);
		console.log("object center y is " + objectOne.centerY);
		var absXDelta = Math.abs(objectOne.centerX - oppCenterX);
		var absYDelta = Math.abs(objectOne.centerY - oppCenterY);
		
		var totalDelta = absXDelta + absYDelta;
		
		console.log("total delta " + totalDelta);
		
		if(totalDelta < (objectRadius + oppRadius))
		{
			console.log("target " + currentOpp + " was hit");
			opponents.splice(currentOpp, 1);
			//currentOpp--;
			return currentOpp;
		}
	}
	return -1;
}
function isHitSquare(objectOne, objectRadius, opponents, oppSize)
{
	var currentOpp;
	for(currentOpp = 0; currentOpp < opponents.length; currentOpp++)
	{
		var objectRelSpotX = opponents[currentOpp].X - objectOne.centerX;
		var objectRelSpotY = opponents[currentOpp].Y - objectOne.centerY;
		//console.log("relative x is " + objectRelSpotX);
		//console.log("relative y is " + objectRelSpotY);
		//console.log("object radius is " + objectRadius);
		if(objectRelSpotX < objectRadius)
		{
			if(objectRelSpotY < objectRadius)
			{
				if((objectRelSpotX + 2 * oppSize) > ( -1 * objectRadius))
				{
					if((objectRelSpotY + 2 * oppSize) > (-1 * objectRadius))
					{
						//console.log("target " + currentOpp + " was hit");
						opponents.splice(currentOpp, 1);
						//currentOpp--;
						return currentOpp;
					}
				}
			}
		}
	}
	
	return -1;
}

function isPlayerHit(player, playerHeight, opponentShot, oppRadius)
{
	var playerCenterX = player.X ;
	var playerCenterY = player.Y + playerHeight;
	
	var absXDelta = Math.abs(opponentShot.centerX - playerCenterX);
	var absYDelta = Math.abs(opponentShot.centerY - playerCenterY);
	
	var totalDelta = absXDelta + absYDelta;
	
	console.log("Ship total delta is" + totalDelta);
	
	console.log("player radius and opp radius is " + (playerHeight + oppRadius));
	if(totalDelta < (playerHeight + oppRadius))
	{
		alert("Player Down");
		//currentOpp--;
		return 0;
	}
	return -1;
}