//Carousel Slick Plugin
$('.slides').slick({
    arrows: false,
    fade: true,
    autoplay: true
});

//Canvas Drawing Pallete

//global variables
var x1, y1, x2, y2; //mouse coordinate vars
var brush = 1; //initial brush var/value
var canvas = document.getElementById("canvas"); 
var context = canvas.getContext("2d");

//Brush Size change using the slider
var brushSize = document.getElementById("brushSlider"); 
var changeLineWidth = function(e) {
    context.lineWidth = brushSize.value;
}

//Color Picker
var colorPal = document.getElementById("colorInput");
var pickColor = function(e) {
    context.strokeStyle = colorPal.value;
}

//select a brush style based on the button selected
$("button").click(function (e) {
    if(e.currentTarget.textContent === "Line") {
        brush = 0;
        } else if (e.currentTarget.textContent === "Pen") {
            brush = 1;
        } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
}); 

//create a center point, based on mouse position, when mouse is pressed down
$("#canvas").mousedown(function (e) {
    x1 = e.pageX - this.offsetLeft;
    y1 = e.pageY - this.offsetTop;
    context.beginPath();
    context.moveTo(x1, y1);
});

//calculate the size and distance of brush stroke, from the center-point to the new point
$("#canvas").mousemove(function (e) {
    if (brush === 1 && e.which) {
        x2 = e.pageX - this.offsetLeft;
        y2 = e.pageY - this.offsetTop;
        context.lineTo(x2, y2);
        context.stroke();
    }
});

//draw calculated shape once mouse button is released
$("#canvas").mouseup(function (e) {
    if (brush === 1) {
        return;
    }    
    x2 = e.pageX - this.offsetLeft;
    y2 = e.pageY - this.offsetTop;
    if(brush === 0){
        context.lineTo(x2, y2);
    }
    context.stroke();
});