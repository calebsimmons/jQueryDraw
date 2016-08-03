var color = $(".selected").css("background-color");
var $canvas = $("canvas")
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//change selected color on click
$(".controls").on("click", "li" ,function() {
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  color = $(this).css("background-color");
});


//toggle color selector on "New Color" button click
$("#revealColorSelect").click(function() {
  $("#colorSelect").toggle();
});


//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color","rgb("+r+","+g+","+b+")");
}

$("input[type=range]").change(changeColor);


//When "Add Color" button is pressed select the new color
$("#addNewColor").click(function() {
  var $newColor = $("<li></li>");
  //append the color to the controls ul
  $newColor.css("background-color",$("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  $newColor.click();
});

$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  if(mouseDown){
    context.beginPath();
    context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
    context.lineTo(e.offsetX,e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});

