const body = document.querySelector(".div1");
const rooms = document.querySelectorAll(".room");
const path = document.querySelectorAll(".pathway");

var zoomValue = 1.0;

//                0  1  2  3  4  5  6  7  8  9 10  11 12  13 14 15  16  17  18  19   20   21  22  23  24   25  26   27  28
var pathIndex = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2 , 3,  1,-1, 4 , 5 ,-1 , 0 , 6 , 7 , -1,  8 , 9,  10 , 11, 12 , 13, 14];

rooms.forEach((room,index) => {
  room.addEventListener('mouseenter',() => {
    console.log(index);
    path[pathIndex[index]].style.visibility = 'visible';
  })
  room.addEventListener('mouseleave', () => {
    path[pathIndex[index]].style.visibility = 'hidden';
  })
});

document.addEventListener("wheel", (event) => {
    if(event.deltaY < 0){
        zoomValue += 0.2;
    }else if(event.deltaY > 0){
        zoomValue -= 0.2;
    }
    updateScale();
})


function updateScale(){
    if(zoomValue < 0.5){
        zoomValue = 0.5;
    }
    body.style.transform = "scale(" + zoomValue + ")";
}

var _startX = 0;
var _startY = 0;
var _offsetX = 0;           
var _offsetY = 0;
var _dragElement;
document.onmousedown = OnMouseDown;
document.onmouseup = OnMouseUp;

function OnMouseDown(event){
  document.onmousemove = OnMouseMove;
    _startX = event.clientX;
  _startY = event.clientY;
  _offsetX = body.offsetLeft;
  _offsetY = body.offsetTop;
  _dragElement = body;
    console.log(_offsetX);
    console.log(_offsetY);
}

function OnMouseMove(event){
  _dragElement.style.left = (_offsetX + event.clientX - _startX) + 'px';
  _dragElement.style.top = (_offsetY + event.clientY - _startY) + 'px';
}

function OnMouseUp(event){
  document.onmousemove = null;
  _dragElement=null;
}