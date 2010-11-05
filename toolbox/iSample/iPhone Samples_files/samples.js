/**
 * @author mmalone
 */
// used by the incremental list loading Sample
var controller = null;
function insertProgress()
{
	var progContainer = document.getElementById("progressCont");
	var can = document.createElement("canvas");
	can.setAttribute("height", 100);
	can.setAttribute("width", 100);
	can.setAttribute("style", "background:#transparent;");
	progContainer.appendChild(can);

	controller = getLoading(can.getContext("2d"), 12, {x:20, y:20}, 6, {width: 2, height: 5}, {red: 50, green: 79, blue: 133});
}
// used by the incremental list loading Sample
function loadMore()
{
	var progContainer = document.getElementById("progressCont");
	// remove progress indicator
	if(progContainer.firstChild)
	{
		controller.stop();
		progContainer.removeChild(progContainer.firstChild);
	}

	// insert progress indicator
	var progContainer = document.getElementById("progressCont");
	var can = document.createElement("canvas");
	can.setAttribute("height", 100);
	can.setAttribute("width", 100);
	can.setAttribute("style", "background:#transparent;");
	progContainer.appendChild(can);

	controller = getLoading(can.getContext("2d"), 12, {x:20, y:20}, 6, {width: 2, height: 5}, {red: 50, green: 79, blue: 133});
	
	setTimeout("appendItems()", 1000);
}
// used by the incremental list loading Sample
function appendItems()
{

	var moreItemLI = document.getElementById("moreListItem");
	var ulElem = moreItemLI.parentNode;
	
	childCount = ulElem.getAttribute("count");
	
	// remove more item
	ulElem.removeChild(moreItemLI);
	// append more items
	for(var appendCount=0;appendCount < 5;appendCount++)
	{
		var newLi = document.createElement("Li");
		var newAnchor = document.createElement("A");
		newAnchor.setAttribute("href","#");
		newAnchor.innerHTML = "Item " + (++childCount) + "";
		newLi.appendChild(newAnchor);
		ulElem.appendChild(newLi);
	}
	//put back more item
	ulElem.appendChild(moreItemLI);
	ulElem.setAttribute("count", childCount);
	
	var progContainer = document.getElementById("progressCont");
	// remove progress indicator
	if(progContainer.firstChild)
	{
		controller.stop();
		progContainer.removeChild(progContainer.firstChild);
	}
}
// used by the toggle button in the button samples
function toggleBtn(which)
{
	which.className = (which.className.indexOf('togButtonOff') > 0) ? 'togButton togButtonOn noHighlight' : 'togButton togButtonOff noHighlight';
}
// used by the orientation sample
if("orientation" in window)
{
	setTimeout("updateOrientation()",10000);
}
// used by the orientation sample
function updateOrientation()
{
	var displayStr = "Orientation " + "(" + window.orientation + "): ";
	
	switch(window.orientation)
	{	
		case 0:
			displayStr += "Portrait";
		break;
		
		case -90:
			displayStr +=  "Landscape (right, screen turned clockwise)";
		break;
		
		case 90:
			displayStr += "Landscape (left, screen turned counterclockwise)";
		break;
		
		case 180:
			displayStr += "Portrait (upside-down portrait)";
		break;
		
	}
	document.getElementById("orientationBucket").innerHTML = displayStr;
}

var startDate = null;

// used by the window sample
var win = null;
function showChild() {
	
	var loc = "child.html";	
	var winStr = "resizable=1,status=yes,scrollbars=yes,toolbar=no,location=no,menu=no";
	var winName = "iPhone";
	win = window.open(loc, winName , winStr);
}

// used by the window sample
function windowCheck() {
	try 
	{
		if(!win.name) {
			alert("Child is Closed");	
			return false;
		}
	}
	catch(e) {
		alert("Child is Closed");	
		return false;
	}
	return true;
}

// Used by the bouncing shape canvas sample
var mainCtx = null;

var animate = false;
var shadowcolor = new Color(0.05, 0.05, 0.25, 1);
var blurradius = 7.0;
var globalalpha = 1.0;
var offsetx = -0.5;
var offsety = -0.5;
var offsetscale = 40;
var animations = null;
var timer = null;
var lastime = 0;

var backgroundRed = 1; // 0.5;
var backgroundGreen = 1; //0.5;
var backgroundBlue = 1; //0.5;
var moving = false;
var intervalTime = 25;

var lastx = -1;
var lasty = -1;
var useShadow = true;

var seed = (new Date).getTime();

// Used by the bouncing shape canvas sample
function loadShapes()
{
	mainCtx = document.getElementById("main-canvas").getContext("2d");

	animations = [new Animation(new Shape(), 300, 300)];

	drawMainCanvas();

	if (animate)
	{
		timer = setInterval("performAnimation();", intervalTime);
		lasttime = new Date().getTime();
	}
}
function addShape()
{
	animations.push( new Animation(new Shape(), 300, 300));
}

// Used by the bouncing shape canvas sample
function randf (min, max)
{
	return min + (max - min) * Math.random(seed);
}

var colors = ["blue", "yellow", "black", "red", "green", "purple", "navy", "orange", "teal", "maroon", "olive"];

Shape.index =-1;
// Used by the bouncing shape canvas sample
function Shape ()
{
	if (Shape.index == -1)
		Shape.index = Math.round(Math.random(seed) * 4);
	
	if (Shape.index == 4)
		Shape.index = 0;
	
	this.shapeStyle = Shape.index++ % 4;
	// 0 = Oval
	// 1 = Rectangle
	// 2 = Rounded Rect
	// 3 = Star
	this.color = colors[Math.floor(12 * Math.random())];
	this.center = new Point (0, 0);
	this.angle = 0;
	this.size = new Size (0, 0);
}

// Used by the bouncing shape canvas sample
Shape.prototype.scalesUniformly = function () {
	return this.shapeStyle == 3; // shapeStyle == Star
}

// Used by the bouncing shape canvas sample
Shape.prototype.draw = function (context) {
	var color = this.color;
	
	context.setFillColor (color);
	context.setStrokeColor (0, 1); // black
	context.setLineWidth (1.5);
	context.save();
	context.translate (this.center.x, this.center.y);
	context.rotate (this.angle);
	if (this.scalesUniformly())
	{
		var scale = Math.min(this.size.width, this.size.height);
		context.scale(scale, scale);
	}
	else
	{
		context.scale (this.size.width, this.size.height);
	}

	this.addPath(context, -0.5, -0.5, 1, 1);
	
	context.fill();
	context.restore();
}

// Used by the bouncing shape canvas sample
Shape.prototype.addPath = function (context, x, y, width, height) {
    var widthFraction = 0.2;
    var heightFraction = 0.2;

    context.translate(x + width/2, y + height/2);

    switch (this.shapeStyle) 
    {
		case 0: //Oval
			context.beginPath();
			context.scale(width/2, height/2);
			context.moveTo(1, 0);
			context.arc(0, 0, 1, 0, 2 * Math.PI, false);
			context.closePath();
		break;
		
		case 1: //Rectangle
			context.scale(width/2, height/2);
			context.rect(-1, -1, 2, 2);
		break;
	
		case 2: //RoundedRect
			context.beginPath();
			var fw = 1 / widthFraction;
			var fh = 1 / heightFraction;
			context.translate(-width / 2, -height / 2);
			context.scale(width / fw, height / fh);
			context.moveTo(fw, fh/2);
			context.arcTo(fw, fh, fw/2, fh, 1);
			context.arcTo(0, fh, 0, fh/2, 1);
			context.arcTo(0, 0, fw/2, 0, 1);
			context.arcTo(fw, 0, fw, fh/2, 1);
			context.closePath();
		break;
		
		case 3: //Star
			context.beginPath();
			var alpha = (2 * Math.PI) / 5;
			var size = new Size(width/2, height/2);
			var radius = Math.sqrt(size.width * size.width + size.height * size.height);
			context.scale(radius, radius);
			context.moveTo(1, 0);
			context.lineTo(Math.cos(alpha), Math.cos(alpha)*Math.tan(alpha/2));
			for (var k = 1; k < 5; k++) {
				context.rotate(alpha);
				context.lineTo(1, 0);
				context.lineTo(Math.cos(alpha), Math.cos(alpha)*Math.tan(alpha/2));
			} 
			context.closePath();
		break;
    }
}
// Used by the bouncing shape canvas sample
function Size (width, height)
{
	this.width = width;
	this.height = height;
}
// Used by the bouncing shape canvas sample
function Point (x, y)
{
	this.x = x;
	this.y = y;
}
// Used by the bouncing shape canvas sample
function Color (r, g, b, a)
{
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}
// Used by the bouncing shape canvas sample
function Animation (shape, width, height)
{
	this.shape = shape;
	this.size = new Size(randf(1,2), randf(1,2));
	this.width = width;
	this.height = height
	this.center = new Point(width/2, height/2);
	
	var theta  = randf(0, 2 * Math.PI);
	
	this.vx = Math.cos(theta);
	this.vy = Math.sin(theta);
	this.velocity = randf(50, 150);
	this.angle = randf(0, 2 * Math.PI);
	this.angularVelocity = Math.PI/4 * randf(-1, 1);
	this.minScale = 40;
	this.maxScale = 100;
	this.scale = randf (this.minScale, this.maxScale);
	this.scaleVelocity = randf(-10, 10);
		
}

// Used by the bouncing shape canvas sample
Animation.prototype.draw = function (context)
{
	var size = new Size (this.scale * this.size.width, this.scale * this.size.height);
	this.shape.center = this.center;
	this.shape.angle = this.angle;
	this.shape.size =  size;
	
	this.shape.draw(context);	
}

// Used by the bouncing shape canvas sample
Animation.prototype.updateParameters = function (seconds)
{
	var dx = seconds * this.velocity * this.vx;
    if ((this.center.x + dx < 0) || (this.center.x + dx > this.width)) {
		this.vx = -this.vx;
		dx = -dx;
    }
    this.center.x += dx;

    var dy = seconds * this.velocity * this.vy;
    if (this.center.y + dy < 0 || this.center.y + dy > this.height) {
		this.vy = -this.vy;
		dy = -dy;
    }
   	this.center.y += dy;

    this.angle += seconds * this.angularVelocity;

    var ds = seconds * this.scaleVelocity;
    if (this.scale + ds < this.minScale || this.scale + ds > this.maxScale) {
		ds = -ds;
		this.scaleVelocity = -this.scaleVelocity;
    }
    this.scale += ds;
}

// Used by the bouncing shape canvas sample
function drawMainCanvas ()
{
	mainCtx.save();

	mainCtx.setFillColor (backgroundRed, backgroundGreen, backgroundBlue, 1);
	mainCtx.fillRect (0, 0, 300, 300);

	mainCtx.setAlpha (globalalpha);
	
	if(useShadow)
	{
		mainCtx.setShadow(offsetx * offsetscale, offsety*offsetscale, blurradius, shadowcolor.r, shadowcolor.g, shadowcolor.b, shadowcolor.a);
	}
	var c = animations.length;
	
	for (var i = 0; i < c; ++i)
	{

		animations[i].draw(mainCtx);
	}
	
	mainCtx.restore();
	
}

// Used by the bouncing shape canvas sample
function performAnimation ()
{
	var now = new Date().getTime();
	var delta = (now - lasttime) / 1000; // / 1000 convert to seconds

	var c = animations.length;
	for (var i = 0; i < c; ++i)
	{
		animations[i].updateParameters(delta);
	}
	lasttime = now;
	drawMainCanvas();
}

// Used by the bouncing shape canvas sample
function animateClick (elem)
{	

	var addBtn = document.getElementById("addBtn");
	animate = animate ? false : true;
	if (animate) // start the timer
	{
		elem.innerText = "Stop";
		timer = setInterval ("performAnimation();", intervalTime);
		addBtn.removeAttribute("disabled");
		
		lasttime = new Date().getTime();
	}
	else // stop the timer
	{
		if (timer != null)
		{
			elem.innerText = "Animate";
			clearInterval(timer);
			timer = null;
			addBtn.setAttribute("disabled","disabled");
		}
	}
}
function minusSize()
{			
	var currSize = document.getElementById('font_bucket').style.fontSize.split("px")[0];
	document.getElementById('font_bucket').style.fontSize = (currSize - 2) + "px";
}
function plusSize()
{
	var currSize = document.getElementById('font_bucket').style.fontSize.split("px")[0];
	document.getElementById('font_bucket').style.fontSize = ((1.0 * currSize) + 2) + "px";
}

