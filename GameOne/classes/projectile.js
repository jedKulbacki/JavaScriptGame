function makeProjectile(x,y,visible)
{
	var proj = new Object();
	proj.centerX = x;
	proj.centerY = y;
	proj.inPlay = visible;
	return proj;
}