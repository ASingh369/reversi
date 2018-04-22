var canvas;
var ctx;
var color;
var colorTrack = 0;  //This used to change color after each turn
var n; //column number
var m; // row number
var blackCount = document.getElementById("blackCount");   //Score on screen
var whiteCount = document.getElementById("whiteCount");


var blackCanvas = document.getElementById("blackCanvas");    // Small canvas
var ctx_black = blackCanvas.getContext("2d");

ctx_black.arc(50,40,15,0,2*Math.PI);
ctx_black.fill();

var whiteCanvas = document.getElementById("whiteCanvas");    // Small canvas
var ctx_white = whiteCanvas.getContext("2d");

ctx_white.fillStyle="white";
ctx_white.arc(50,40,15,0,2*Math.PI);
ctx_white.fill();


var myArray = Array();   //this array keeps the boxes that have been used
var white = Array();     // this array keeps all the current white circles
var black = Array();	// this array keeps all the current black circles


// Adding initial four points into respective arrays

myArray.push("33");
myArray.push("43");
myArray.push("34");
myArray.push("44");

white.push("33");
white.push("44");
black.push("34");
black.push("43");

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

function columns(color){      //used to draw columns on canvas
  ctx.strokeStyle = color;
  ctx.strokeRect(0,0,100,6400);   
}

function rows(color){       //Used to draw rows 
  ctx.strokeStyle = color;
  ctx.strokeRect(0,0,800,80);   
}


function edges(color){      // draw rows and columns
    var columnsLoop;    
    ctx.save();
    for(columnsLoop = 0; columnsLoop < 9; columnsLoop = columnsLoop +1){
      columns(color);
      ctx.translate(100,0);
    }
    ctx.restore();
	
    var rowsLoop;
    ctx.save();
    for(rowsLoop = 0; rowsLoop < 9; rowsLoop=rowsLoop + 1){
      rows(color);
      ctx.translate(0,80);
    }
    ctx.restore();
}

edges("black");     // calling the above function and setting the initial color of all the edges to black


function outputColor(){    //this function returns alternate color whenever it is called
  if (colorTrack == 0){
    color = "black";
    colorTrack = colorTrack + 1;
  }
  else if (colorTrack == 1){
    color = "white";
    colorTrack = colorTrack - 1;
  }
  return color;  
}

function circle(color){        //Simple small circle 
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(50,40,15,0,2*Math.PI);
  ctx.fill();
}

function drawCircle(){    //Draws the circle using the color returned by outputColor() function
  circle(outputColor());
}


// This is where it's all going down!!!
function game(event){             
  var rect = canvas.getBoundingClientRect();
  
  xPos = event.clientX - rect.left;         // (xPos,yPos) are the coordinates of the point where mouse click happens with respect to canvas   
  yPos = event.clientY - rect.top;

  n = Math.floor(xPos/100);      // dividing canvas into rows and columns used the above coordinates
  m = Math.floor(yPos/80);		// REMEMBER m represents rows and n represents columns 
  
  
  //m.toString()+n.toString() is just "mn" and it is used a lot in the rest of the code
  
  if (myArray.indexOf(m.toString()+n.toString()) == -1 && myArray.length <= 64){
      ctx.save();
      ctx.translate((n)*100,(m)*80);
      drawCircle();
      ctx.restore();
      myArray.push(m.toString()+n.toString());         // "mn" is added to the myArray 
      
      if(color == "white"){
        white.push(m.toString()+n.toString());         
      }
      else if(color == "black"){
        black.push(m.toString()+n.toString());  
      }
	  
	  // the following functions changes/flips the color of the circles according to the rules of the game
	  
      flipdown();
      flipup();
      flipright();
      flipleft();
      flipES();    // ES stands for East-South
      flipNW();    // NW - North-West
      flipWS();    // WS - West-South
      flipNE();    // NE - North-East

  }
     
 
  blackCount.innerHTML = black.length;      //Updating the scores on screen
  whiteCount.innerHTML = white.length;
  
  if(color == "black"){
    edges("white");			 // change the color of edges after each turn
  }
  if(color == "white"){
    edges("black");
  }
  
  
  //  Final Results
  if(white.length == 0){ 
      ctx.clearRect(0,0,800,640);
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.font = "50px sans-serif";   
      ctx.fillText("Player 1 Wins!", 250, 320);
      myArray = Array(100);
  }
  if(black.length == 0){ 
      ctx.clearRect(0,0,800,640);   
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.font = "50px sans-serif";   
      ctx.fillText("Player 2 Wins!", 250, 320);
      myArray = Array(100);
  }
  
  if(myArray.length == 64){
    if(white.length > black.length){
      ctx.clearRect(0,0,800,640);    
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.font = "50px sans-serif";   
      ctx.fillText("Player 2 Wins!", 250, 320);
    }
    if(black.length > white.length){
      ctx.clearRect(0,0,800,640);    
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.font = "50px sans-serif";   
      ctx.strokeText("Player 1 Wins!", 250, 320);
    }
    if(white.length == black.length){
      ctx.clearRect(0,0,800,640);    
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.font = "50px sans-serif";   
      ctx.strokeText("Draw", 275, 320);
    }
  }
    
  
  
}


// Drawing initial four Circles
ctx.save();
ctx.translate((3)*100,(4)*80);
drawCircle();
ctx.restore();

ctx.save();
ctx.translate((3)*100,(3)*80);
drawCircle();
ctx.restore();

ctx.save();
ctx.translate((4)*100,(3)*80);
drawCircle();
ctx.restore();
ctx.save();
ctx.translate((4)*100,(4)*80);
drawCircle();
ctx.restore();



// The rest of the code are just eight functions which are very similar to each other



var rowC;       // Current row
var x;          
var row;        // row no of circle till which flipping is done

function flipdown(){
  x= -1;
  if(color == "black"){
    rowC = m+1;
    while(rowC<8){
      if(black.indexOf(rowC.toString()+n.toString()) != -1){
        x=rowC;
        break;
      }
      if(myArray.indexOf(rowC.toString()+n.toString()) == -1){
        x = m+1;
        break;
      }

      rowC = rowC + 1;
    }
  }
  
  if(color == "white"){   
    rowC = m+1;
    while(rowC<8){
      if(white.indexOf(rowC.toString()+n.toString()) != -1){
        x=rowC;
        break;
      }
      if(myArray.indexOf(rowC.toString()+n.toString()) == -1){
        x = m+1;
        break;
      }

      rowC = rowC + 1;
    }
  }
  
  if(x>m){
    row = m+1;
    while(row<x){                     // flipping
      ctx.save();
      ctx.translate((n)*100,(row)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(row.toString()+n.toString());        // removing and adding circles to respective arrays
        black.push(row.toString()+n.toString());
      }
      if(color == "white"){
        blackRemove(row.toString()+n.toString());
        white.push(row.toString()+n.toString());
      }
      row = row+1;
    }
  }
}



//functions to remove the circles from arrays

var indexWhite;
function whiteRemove(W_Remove){
  indexWhite= white.indexOf(W_Remove);
  if(indexWhite>-1){
    white.splice(indexWhite,1);
  }
}

var indexBlack;
function blackRemove(B_Remove){
  indexBlack= black.indexOf(B_Remove);
  if(indexBlack>-1){
    black.splice(indexBlack,1);
  }
}


// The rest of the is just 7 functions which has same functionality as flipdown()


var x_up;
var something_up;
var row_up;


function flipup(){
  x_up= 9;
  if(color == "black"){
    something_up = m-1;
    while(something_up>-1){
      if(black.indexOf(something_up.toString()+n.toString()) != -1){
        x_up=something_up;
        break;
      }
      if(myArray.indexOf(something_up.toString()+n.toString()) == -1){
        x_up = m-1;
        break;
      }

      something_up = something_up - 1;
    }
  }
  
  if(color == "white"){   
    something_up = m-1;
    while(something_up>-1){
      if(white.indexOf(something_up.toString()+n.toString()) != -1){
        x_up=something_up;
        break;
      }
      if(myArray.indexOf(something_up.toString()+n.toString()) == -1){
        x_up = m-1;
        break;
      }

      something_up = something_up - 1;
    }
  }
  
  if(x_up<m){
    row_up = m-1;
    while(row_up>x_up){
      ctx.save();
      ctx.translate((n)*100,(row_up)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(row_up.toString()+n.toString());
        black.push(row_up.toString()+n.toString());
      }
      if(color == "white"){
        blackRemove(row_up.toString()+n.toString());
        white.push(row_up.toString()+n.toString());
      }
      row_up = row_up-1;
    }
  }
}

var y;
var something_right;
var row_right;

function flipright(){
  y= -1;
  if(color == "black"){
    something_right = n+1;
    while(something_right<8){
      if(black.indexOf(m.toString()+something_right.toString()) != -1){
        y=something_right;
        break;
      }
      if(myArray.indexOf(m.toString()+something_right.toString()) == -1){
        y = n+1;
        break;
      }

      something_right = something_right + 1;
    }
  }
  
  if(color == "white"){   
    something_right = n+1;
    while(something_right<8){
      if(white.indexOf(m.toString()+something_right.toString()) != -1){
        y=something_right;
        break;
      }
      if(myArray.indexOf(m.toString()+something_right.toString()) == -1){
        y = n+1;
        break;
      }

      something_right = something_right + 1;
    }
  }
 
  if(y>n){
    row_right = n+1;
    while(row_right<y){
      ctx.save();
      ctx.translate((row_right)*100,(m)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(m.toString()+row_right.toString());
        black.push(m.toString()+row_right.toString());
      }
      if(color == "white"){
        blackRemove(m.toString()+row_right.toString());
        white.push(m.toString()+row_right.toString());
      }
      row_right = row_right+1;
    }
  }
}

var y_left;
var something_left;
var row_left;

function flipleft(){
  y_left= 9;
  if(color == "black"){
    something_left = n-1;
    while(something_left>-1){
      if(black.indexOf(m.toString()+something_left.toString()) != -1){
        y_left=something_left;
        break;
      }
      if(myArray.indexOf(m.toString()+something_left.toString()) == -1){
        y_left = n-1;
        break;
      }

      something_left = something_left - 1;
    }
  }
  
  if(color == "white"){   
    something_left = n-1;
    while(something_left>-1){
      if(white.indexOf(m.toString()+something_left.toString()) != -1){
        y_left=something_left;
        break;
      }
      if(myArray.indexOf(m.toString()+something_left.toString()) == -1){
        y_left = n-1;
        break;
      }

      something_left = something_left - 1;
    }
  }
  
  if(y_left<n){
    row_left = n-1;
    while(row_left>y_left){
      ctx.save();
      ctx.translate((row_left)*100,(m)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(m.toString()+row_left.toString());
        black.push(m.toString()+row_left.toString());
      }
      if(color == "white"){
        blackRemove(m.toString()+row_left.toString());
        white.push(m.toString()+row_left.toString());
      }
      row_left = row_left-1;
    }
  }
}






var rowES;
var new_rowES;
var new_columnES;
var add_rowES;
var add_columnES;
var columnES;

function flipES(){
  new_rowES= -1;
  new_columnES = -1;
  if(color == "black"){
    rowES = m+1;
    columnES = n+1;
    while(rowES<8){
      if(black.indexOf(rowES.toString()+columnES.toString()) != -1){
        new_rowES= rowES;
        new_columnES= columnES;
        break;
      }
      if(myArray.indexOf(rowES.toString()+columnES.toString()) == -1){
        new_rowES = m+1;
        new_columnES = n+1;
        break;
      }

      rowES = rowES + 1;
      columnES = columnES + 1;
    }
  }
  
  if(color == "white"){   
    rowES = m+1;
    columnES = n+1;
    while(rowES<8){
      if(white.indexOf(rowES.toString()+columnES.toString()) != -1){
        new_rowES= rowES;
        new_columnES= columnES;
        break;
      }
      if(myArray.indexOf(rowES.toString()+columnES.toString()) == -1){
        new_rowES = m+1;
        new_columnES = n+1;
        break;
      }

      rowES = rowES + 1;
      columnES = columnES + 1;
    }
  }
  
  if(new_rowES>m){
    add_rowES = m+1;
    add_columnES = n+1;
    while(add_rowES<new_rowES){
      ctx.save();
      ctx.translate((add_columnES)*100,(add_rowES)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(add_rowES.toString()+add_columnES.toString());
        black.push(add_rowES.toString()+add_columnES.toString());
      }
      if(color == "white"){
        blackRemove(add_rowES.toString()+add_columnES.toString());
        white.push(add_rowES.toString()+add_columnES.toString());
      }
      add_rowES = add_rowES+1;
      add_columnES = add_columnES +1;
    }
  }
}







var rowNW;
var new_rowNW;
var new_columnNW;
var add_rowNW;
var add_columnNW;
var columnNW;

function flipNW(){
  new_rowNW= 9;
  new_columnNW = 9;
  if(color == "black"){
    rowNW = m-1;
    columnNW = n-1;
    while(rowNW >-1){
      if(black.indexOf(rowNW.toString()+columnNW.toString()) != -1){
        new_rowNW= rowNW;
        new_columnNW= columnNW;
        break;
      }
      if(myArray.indexOf(rowNW.toString()+columnNW.toString()) == -1){
        new_rowNW = m-1;
        new_columnNW = n-1;
        break;
      }

      rowNW = rowNW - 1;
      columnNW = columnNW - 1;
    }
  }
  
  if(color == "white"){   
    rowNW = m-1;
    columnNW = n-1;
    while(rowNW>-1){
      if(white.indexOf(rowNW.toString()+columnNW.toString()) != -1){
        new_rowNW= rowNW;
        new_columnNW= columnNW;
        break;
      }
      if(myArray.indexOf(rowNW.toString()+columnNW.toString()) == -1){
        new_rowNW = m-1;
        new_columnNW = n-1;
        break;
      }

      rowNW = rowNW - 1;
      columnNW = columnNW - 1;
    }
  }
  
  if(new_rowNW<m){
    add_rowNW = m-1;
    add_columnNW = n-1;
    while(add_rowNW>new_rowNW){
      ctx.save();
      ctx.translate((add_columnNW)*100,(add_rowNW)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(add_rowNW.toString()+add_columnNW.toString());
        black.push(add_rowNW.toString()+add_columnNW.toString());
      }
      if(color == "white"){
        blackRemove(add_rowNW.toString()+add_columnNW.toString());
        white.push(add_rowNW.toString()+add_columnNW.toString());
      }
      add_rowNW = add_rowNW-1;
      add_columnNW = add_columnNW -1;
    }
  }
}










var rowWS;
var new_rowWS;
var new_columnWS;
var add_rowWS;
var add_columnWS;
var columnWS;

function flipWS(){
  new_rowWS= -1;
  new_columnWS = 9;
  if(color == "black"){
    rowWS = m+1;
    columnWS = n-1;
    while(rowWS<8){
      if(black.indexOf(rowWS.toString()+columnWS.toString()) != -1){
        new_rowWS= rowWS;
        new_columnWS= columnWS;
        break;
      }
      if(myArray.indexOf(rowWS.toString()+columnWS.toString()) == -1){
        new_rowWS = m+1;
        new_columnWS = n-1;
        break;
      }

      rowWS = rowWS + 1;
      columnWS = columnWS - 1;
    }
  }
  
  if(color == "white"){   
    rowWS = m+1;
    columnWS = n-1;
    while(rowWS<8){
      if(white.indexOf(rowWS.toString()+columnWS.toString()) != -1){
        new_rowWS= rowWS;
        new_columnWS= columnWS;
        break;
      }
      if(myArray.indexOf(rowWS.toString()+columnWS.toString()) == -1){
        new_rowWS = m+1;
        new_columnWS = n-1;
        break;
      }

      rowWS = rowWS + 1;
      columnWS = columnWS - 1;
    }
  }
  
  if(new_rowWS>m){
    add_rowWS = m+1;
    add_columnWS = n-1;
    while(add_rowWS<new_rowWS){
      ctx.save();
      ctx.translate((add_columnWS)*100,(add_rowWS)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(add_rowWS.toString()+add_columnWS.toString());
        black.push(add_rowWS.toString()+add_columnWS.toString());
      }
      if(color == "white"){
        blackRemove(add_rowWS.toString()+add_columnWS.toString());
        white.push(add_rowWS.toString()+add_columnWS.toString());
      }
      add_rowWS = add_rowWS+1;
      add_columnWS = add_columnWS -1;
    }
  }
}







var rowNE;
var new_rowNE;
var new_columnNE;
var add_rowNE;
var add_columnNE;
var columnNE;

function flipNE(){
  new_rowNE= 9;
  new_columnNE = -1;
  if(color == "black"){
    rowNE = m-1;
    columnNE = n+1;
    while(rowNE >-1){
      if(black.indexOf(rowNE.toString()+columnNE.toString()) != -1){
        new_rowNE= rowNE;
        new_columnNE= columnNE;
        break;
      }
      if(myArray.indexOf(rowNE.toString()+columnNE.toString()) == -1){
        new_rowNE = m-1;
        new_columnNE = n+1;
        break;
      }

      rowNE = rowNE - 1;
      columnNE = columnNE + 1;
    }
  }
  
  if(color == "white"){   
    rowNE = m-1;
    columnNE = n+1;
    while(rowNE>-1){
      if(white.indexOf(rowNE.toString()+columnNE.toString()) != -1){
        new_rowNE= rowNE;
        new_columnNE= columnNE;
        break;
      }
      if(myArray.indexOf(rowNE.toString()+columnNE.toString()) == -1){
        new_rowNE = m-1;
        new_columnNE = n+1;
        break;
      }

      rowNE = rowNE - 1;
      columnNE = columnNE + 1;
    }
  }
  
  if(new_rowNE<m){
    add_rowNE = m-1;
    add_columnNE = n+1;
    while(add_rowNE>new_rowNE){
      ctx.save();
      ctx.translate((add_columnNE)*100,(add_rowNE)*80);
      circle(color);      
      ctx.restore();
      if(color == "black"){
        whiteRemove(add_rowNE.toString()+add_columnNE.toString());
        black.push(add_rowNE.toString()+add_columnNE.toString());
      }
      if(color == "white"){
        blackRemove(add_rowNE.toString()+add_columnNE.toString());
        white.push(add_rowNE.toString()+add_columnNE.toString());
      }
      add_rowNE = add_rowNE-1;
      add_columnNE = add_columnNE +1;
    }
  }
}


