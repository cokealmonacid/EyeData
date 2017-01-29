document.addEventListener("DOMContentLoaded", function(event) {
  var w = window.innerWidth;
  var h = window.innerHeight;

  var dot = document.getElementById('dot');
  var feedback = document.getElementById('feedback');

  var imageWidth = dot.offsetWidth,
    imageHeight = dot.offsetHeight;

  dot.style.position = 'absolute';

  var remote = require('electron').remote;
  var totalGaze = 0; // count the total gazes in the calibration process
  var totalArea = 0; // count the total gazes in the showen area

  EyeTribe.loop(function(frame){
    switch(totalGaze) {
      case 0:
        //centro
        console.log("centro");
        dot.style.left = (w - imageWidth)/2 + 'px';
        dot.style.top = (h - imageHeight)/2 + 'px';
        break;
      case 100:
        //esq. superior izq.
        console.log("esquina superior izq");
        dot.style.left = (w * 0.15 - imageWidth) + 'px';
        dot.style.top = (h * 0.25 - imageHeight) + 'px';
        break;
      case 200:
        //centro sup
        console.log("centro sup");
        dot.style.left = (w - imageWidth)/2 + 'px';
        dot.style.top = (h * 0.25 - imageHeight) + 'px';
        break;
      case 300:
        // centro der
        console.log("centro der");
        dot.style.left = 'inherit'
        dot.style.top = (h - imageHeight)/2 + 'px';
        dot.style.right = (w * 0.15 - imageWidth) + 'px';
        break;
      case 400:
        //esq. inf. izq
        console.log("esquina inferior izq");
        dot.style.right = 'inherit';
        dot.style.top = 'inherit';
        dot.style.left = (w * 0.15 - imageWidth) + 'px';
        dot.style.bottom = (h * 0.25 - imageHeight) + 'px';
        break;
      case 500:
        //esq. superior der.
        console.log("esquina superior der");
        dot.style.bottom = 'inherit';
        dot.style.left = 'inherit';
        dot.style.right = (w * 0.15 - imageWidth) + 'px';
        dot.style.top = (h * 0.25 - imageHeight) + 'px';
        break;
      case 600:
        // esq. inferior der
        console.log("esquina inferior der");
        dot.style.top = 'inherit';
        dot.style.right = (w * 0.15 - imageWidth) + 'px';
        dot.style.bottom = (h * 0.25 - imageHeight) + 'px';
        break;
      case 700:
        // centro izq
        console.log("centro izq");
        dot.style.bottom = 'inherit';
        dot.style.right = 'inherit';
        dot.style.left = (w * 0.15 - imageWidth) + 'px';
        dot.style.top = (h - imageHeight)/2 + 'px';
        break;
      case 800:
        //centro inferior
        console.log("centro inferior");
        dot.style.top = 'inherit';
        dot.style.right = 'inherit';
        dot.style.left = (w - imageWidth)/2 + 'px';
        dot.style.bottom = (h * 0.25 - imageHeight) + 'px';
        break;
      case 900:
        //  centro
        console.log("centro");
        dot.style.bottom = 'inherit';
        dot.style.right = 'inherit';
        dot.style.left = (w - imageWidth)/2 + 'px';
        dot.style.top = (h - imageHeight)/2 + 'px';
        break;
      case 1000:

        dot.style.display = 'none';
        feedback.style.display = 'initial';

        if (totalArea >= 500){
          feedback.innerHTML = "<p>Press Space bar to continue</p>";
        } else {
          feedback.innerHTML = "<p>Failed calibration! press Q to reboot</p>";
        }
    }

    var position = getPosition(dot);

    var check = checkArea(position.x, position.y, frame.average);
    if (check) totalArea += 1;

    totalGaze += 1;
  })

    window.onkeypress = function(e) {
    if (e.charCode == 32) { // spacebar
      var screen = remote.getCurrentWindow();
      screen.loadURL(`file://${__dirname}/lookingPosition.html`);
    }

    if (e.charCode == 113) { // Quit
      var screen = remote.getCurrentWindow();
      screen.loadURL(`file://${__dirname}/calibration.html`)
    }
  };

});

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

function checkArea(elx, ely, average) {
  var width = screen.width;
  var height = screen.height;
  var gazeX = Math.abs(average.x);
  var posx1 = elx - 60;
  var posx2 = elx + 120;

  if ((posx1 <= gazeX) && (gazeX <= posx2)) {
      return true;
  } else {
      return false;
  }
}