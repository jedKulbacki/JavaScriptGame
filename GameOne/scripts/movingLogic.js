function moveOpponent(limitWidth, limitHeight, pX, pY)
{
	var position = new Object();
	position.X = 0;
	position.Y = 0;
	var toX = Math.floor(Math.random() * 10 );
	var toY = Math.floor(Math.random() * 10 );
	if((toX % 2) == 0)
	{
		if((pX + toX) < limitWidth)
		{
			//return pX + toX;
			position.X = pX + toX + 1;
		}
		else
		{
			//return pX - (3 * toX);
			position.X = pX - (3 * toX);
		}
	}
	else
	{
		if((pX - toX) > 0)
		{
			//return pX + toX;
			position.X = pX - toX;
		}
		else
		{
			//return pX - (3 * toX);
			position.X = pX + (3 * toX);
		}
	}
	
	if((toY % 2) == 0)
	{
		if((pY + toY) < limitHeight)
		{
			position.Y = pY + toY;
		}
		else
		{
			position.Y = pY - (3 * toY);
		}
	}
	else
	{
		if((pY - toY) > 0)
		{
			//return pX + toX;
			position.Y = pY - toY;
		}
		else
		{
			//return pX - (3 * toX);
			position.Y = pY + (3 * toY);
		}
	}	
	
	return  position;
}
