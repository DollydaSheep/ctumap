const body = document.querySelector(".div1");
const rooms = document.querySelectorAll(".room");
const path = document.querySelectorAll(".pathway");
const search = document.querySelector(".searchinput");
const searchcontainer = document.querySelector(".search-container");
const floorbutton = document.querySelector(".floorbutton");


var zoomValue = 1.0;

//                0  1  2  3  4  5  6  7  8  9 10  11 12  13 14 15  16  17  18  19   20   21  22  23  24   25  26   27  28
var pathIndex = [ 2 ,3, 1,-1, 4, 5,-1, 0, 6, 7,-1, 8,  9, 10,11,12 ,13 ,14 ,-1 ,-1 , -1, -1,  -1, -1, -1,  -1, -1 , -1, -1];

var roomname = ["Registrar R","Registar L","Ambut1","Ambut2", "Educ Room 1","Educ Room 2","Office","Clinic","EE Lab","CE Lab","Living Room","Com Lab 2","EL Lab","EN 102","EN 101"];
var roomindex = [7,2,0,1,4,5,8,9,11,12,13,14,15,16,17];

var floorcount = 0;
var floor = ["first","second"];

// hover effect sa mga room og katung path2 //

rooms.forEach((room,index) => {
  room.addEventListener('mouseenter',() => {
    console.log(index);
    path[pathIndex[index]].style.visibility = 'visible';
  })
  room.addEventListener('mouseleave', () => {
    path[pathIndex[index]].style.visibility = 'hidden';
  })
});

// zoom og move nga function sa map //

body.addEventListener("wheel", (event) => {
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

// ----------------------- //

var element;

var lastindex = -1;

// Search //
function updateLegend(){
  let word = search.value;
  while (searchcontainer.hasChildNodes()) {
    searchcontainer.removeChild(searchcontainer.firstChild);
  }

  // kung naay gi type //
  if(word){
    for(var i=0;i<roomname.length;i++){
      if((roomname[i].toLowerCase()).startsWith(word.toLowerCase())){
        let html = `<div class="search-element"><h3>${roomname[i]}</h3></div>`
        searchcontainer.insertAdjacentHTML('beforeend',html);
      }
      
    }
    element = document.querySelectorAll(".search-element");
    console.log(element);
    element.forEach((el) => {
      el.addEventListener("click",()=>{
        var index = -1;
        for(var i = 0;i<roomname.length;i++){
          if(el.innerText == roomname[i]){
            index = i;
          }
        }
        if(lastindex != -1){
          path[lastindex].style.visibility = 'hidden';
          rooms[roomindex[lastindex]].style.fill = "transparent";
        }
        lastindex = index;
        path[index].style.visibility = 'visible';
        rooms[roomindex[index]].style.fill = "red";
        floorbutton.style.bottom = "10em";
        selectedroom = index;
      })
    })
  }
}

// pang deselect kung mupislit ka bisag asa //

body.addEventListener("click", (e)=>{
  if(!search.contains(e.target)){
    if(lastindex!=-1){
      path[lastindex].style.visibility = 'hidden';
      rooms[roomindex[lastindex]].style.fill = "transparent";
    }
    if(selectedroom != -1){
      if(!rooms[selectedroom].contains(e.target)){
        floorbutton.style.bottom = "1em";
        console.log("HOLA");
      }
      
    }
  }
  
})

var selectedroom = -1;

rooms.forEach((room,index) => {
  room.addEventListener("click",()=>{
    floorbutton.style.bottom = "10em";
    selectedroom = index;
    // body.style.transform = "translate(-700px,-300px) scale(3.0)";
    // body.style.transformOrigin = "700px 300px";
    // zoomValue = 3.0;
    // console.log("transform");
  })
});

updateLegend();

function plusFloor(){
  floorcount++;
  if(floorcount==2){
    floorcount = 1;
  }
  console.log(floorcount);
  updateFloor();
}

function minusFloor(){
  floorcount--;
  if(floorcount==-1){
    floorcount = 0;
  }
  console.log(floorcount);
  updateFloor();
}

function updateFloor(){
  for(var i = 0;i<floor.length;i++){
    console.log(`.${floor[floorcount]}`);
    if(i==floorcount){
      document.querySelector(`.${floor[i]}`).style.opacity = 1;
    }else{
      document.querySelector(`.${floor[i]}`).style.opacity = 0;
    }
    
  }
}

