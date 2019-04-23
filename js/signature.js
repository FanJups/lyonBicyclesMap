
$("#canvas_signature").css("width", '150px');

$("#canvas_signature").css("height", '150px');

var canvasLyon = document.getElementById("canvas_signature");

var ctxCanvasLyon = canvasLyon.getContext('2d');

ctxCanvasLyon.fillStyle = "white";

ctxCanvasLyon.fillRect(0,0,canvasLyon.width,canvasLyon.height);

var mouse = {x: 0, y: 0};

var last_mouse = {x: 0, y: 0};

/* Mouse Capturing Work */


canvasLyon.addEventListener('mousemove',function(e) {


	last_mouse.x = mouse.x;

	last_mouse.y = mouse.y;

	mouse.x = e.pageX - this.offsetLeft;

    mouse.y = e.pageY - this.offsetTop;


},false);

canvasLyon.addEventListener('touchmove',function(e) {


	last_mouse.x = mouse.x;

	last_mouse.y = mouse.y;

	mouse.x = e.pageX - this.offsetLeft;

    mouse.y = e.pageY - this.offsetTop;


},false);

/* Drawing on Paint App */

ctxCanvasLyon.lineWidth = "3";

ctxCanvasLyon.lineJoin = 'metter';

ctxCanvasLyon.lineCap = 'butt';

ctxCanvasLyon.strokeStyle = 'black';

canvasLyon.addEventListener('mousedown',function(e) {

	canvasLyon.addEventListener('mousemove',onPaint,false);

},false);

canvasLyon.addEventListener('mouseup',function(e) {

	canvasLyon.addEventListener('mousemove',onPaint,false);
	
},false);

//Mobile

canvasLyon.addEventListener('touchstart',function(e) {

	canvasLyon.addEventListener('touchmove',onPaint,false);
	
},false);

canvasLyon.addEventListener('touchend',function(e) {

	canvasLyon.addEventListener('touchmove',onPaint,false);
	
},false);

var onPaint = function() {

	ctxCanvasLyon.beginPath();

    ctxCanvasLyon.moveTo(last_mouse.x, last_mouse.y);

    ctxCanvasLyon.lineTo(mouse.x, mouse.y);

    ctxCanvasLyon.closePath();

    ctxCanvasLyon.stroke();

    ctxCanvasLyon.save();
};

canvasLyon.addEventListener('touchstart',function(e) {

	$('#canvas_signature').css('cursor', 'crosshair');

},false);

canvasLyon.addEventListener('touchend',function(e) {

	$('#canvas_signature').css('cursor', 'crosshair');
	
},false);

$("#canvas_signature").mousedown(function(){

    $('#canvas_signature').css('cursor', 'crosshair'); 

});

$("#canvas_signature").hover(function(){

    $('#canvas_signature').css('cursor', 'crosshair');

});

$("#canvas_signature").mouseenter(function(){

    $('#canvas_signature').css('cursor', 'crosshair');

});

$("#canvas_signature").mousemove(function(){

    $('#canvas_signature').css('cursor', 'crosshair');

});

