/**
 * canvas.js is for generating and animating the wave background
 * canvase for my homepage.
 */

(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
      };
  window.requestAnimationFrame = requestAnimationFrame;
})();

// canvases
var b1;
var b2;
var b3;
var b4;
var b5;
var b6;
var b7;
var b8;
var b9;
var b10;
// separate contexts for each canvas
var b1Ctx;
var b2Ctx;
var b3Ctx;
var b4Ctx;
var b5Ctx;
var b6Ctx;
var b7Ctx;
var b8Ctx;
var b9Ctx;
var b10Ctx;
// arrays to allow loops
var canvases;
var contexts;

var width;
var height;
// for spacing out the opacity changing among canvases
var shaderOffset;
// for keeping track of opacity change direction
var opacityChange;

// time variables
var elapsed ;
var was;
var now;

function init() {
  b1 = document.getElementById("1Board");
  b2 = document.getElementById("2Board");
  b3 = document.getElementById("3Board");
  b4 = document.getElementById("4Board");
  b5 = document.getElementById("5Board");
  b6 = document.getElementById("6Board");
  b7 = document.getElementById("7Board");
  b8 = document.getElementById("8Board");
  b9 = document.getElementById("9Board");
  b10 = document.getElementById("10Board");

  b1Ctx = b1.getContext('2d');
  b2Ctx = b2.getContext('2d');
  b3Ctx = b3.getContext('2d');
  b4Ctx = b4.getContext('2d');
  b5Ctx = b5.getContext('2d');
  b6Ctx = b6.getContext('2d');
  b7Ctx = b7.getContext('2d');
  b8Ctx = b8.getContext('2d');
  b9Ctx = b9.getContext('2d');
  b10Ctx = b10.getContext('2d');

  width = window.innerWidth;
  height = window.innerHeight;
  canvasHeight = Math.round(height/10);

  // vertically stacked canvases
  b1.width = width;
  b1.height = canvasHeight;
  b1.style.top = (canvasHeight * 9) + "px";
  b1.style.bottom = 0;

  b2.width = width;
  b2.height = canvasHeight;
  b2.style.top = (canvasHeight * 8) + "px";
  b2.style.bottom = b1.style.top;

  b3.width = width;
  b3.height = canvasHeight;
  b3.style.top = (canvasHeight * 7) + "px";
  b3.style.bottom = b2.style.top;

  b4.width = width;
  b4.height = canvasHeight;
  b4.style.top = (canvasHeight * 6) + "px";
  b4.style.bottom = b3.style.top;;

  b5.width = width;
  b5.height = canvasHeight;
  b5.style.top = (canvasHeight * 5) + "px";
  b5.style.bottom = b4.style.top;;

  b6.width = width;
  b6.height = canvasHeight;
  b6.style.top = (canvasHeight * 4) + "px";
  b6.style.bottom = b5.style.top;;

  b7.width = width;
  b7.height = canvasHeight;
  b7.style.top = (canvasHeight * 3) + "px";
  b7.style.bottom = b6.style.top;;

  b8.width = width;
  b8.height = canvasHeight;
  b8.style.top = (canvasHeight * 2) + "px";
  b8.style.bottom = b7.style.top;;

  b9.width = width;
  b9.height = canvasHeight;
  b9.style.top = (canvasHeight * 1) + "px";
  b9.style.bottom = b8.style.top;;

  b10.width = width;
  b10.height = height - (canvasHeight * 9) + 3;
  b10.style.top = 0;
  b10.style.bottom = b9.style.top;;

  canvases = new Array(b1, b2, b3, b4, b5 ,b6 ,b7, b8, b9, b10);
  contexts = new Array(b1Ctx, b2Ctx,b3Ctx, b4Ctx, b5Ctx, b6Ctx, b7Ctx, b8Ctx,
     b9Ctx, b10Ctx);

  for (let i = 0; i < 10; i++) {
    canvases[i].style.opacity = 1.0;
  }

  shaderOffset = 0;
  opacityChange = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1);

  was = new Date().getMilliseconds();

  drawBoxes();
  elapsed = 0;
  // delay opacity animation until site's loaded
  while (elapsed < 9000) {
    let temp = was;
    was = new Date().getMilliseconds();
    if (was < temp) {
      elapsed += 1000 - temp + was;
    } else {
      elapsed += was - temp;
    }
  }
  animate();
}


// set to 30fps for now
function animate() {
  setTimeout(function() {
    
    now = new Date().getMilliseconds();
    // makes sure that we are able to stagger animation by 1 fps
    if ( (now >= was + 33) || (now < was)) {
      
      for (let i = 0; i < 10; i++) {

        let opacChange = opacityChange[i] * 0.005;
        let opac = parseFloat(canvases[i].style.opacity) + opacChange;
        // reverse the change in opacity level when at an extreme
        if (opac <= 0.0 || opac >= 1.0) {
          opacityChange[i] *= -1;
        }
        if (shaderOffset >= i) {
          canvases[i].style.opacity = opac.toString();
        }
        
      }
      if (shaderOffset < 10) { 
        shaderOffset++;
      }
    }
    /////////////////////////////////////////////
    //////////// SHIT GLOWS /////////////////////
    /////////////////////////////////////////////
    // for (let i = 0; i < 10; i++) {
    //   opacChange = opacityChange[i] * 0.01;
    //   console.log(opacChange);
    //   opac = parseFloat(canvases[i].style.opacity) + opacChange;
    //   console.log(opac);
    //   canvases[i].style.opacity = opac.toString();
    //   if (opac <= 0.0 || opac >= 1.0) {
    //     opacityChange[i] *= -1;
    //   }
    // }
    /////////////////////////////////////////////

    was = now;
    drawBoxes();
    requestAnimationFrame(animate);
  }, 1000 / 30);
}

function drawBoxes() {
  for (let i = 0; i < 10; i++) {
    contexts[i].clearRect(0, 0, width, canvasHeight);
    contexts[i].fillRect(0, 0, width, canvasHeight);
  }
}

// future function for rescaling and resizing animation
function updateWindow() {
  
}
init();
