document.addEventListener("DOMContentLoaded", function(event) {
  var gTotal = 0;
  var gArea = 0;
  var fixationArea = document.getElementById('dot');
  var remote = require('electron').remote;

  EyeTribe.loop(function(frame) {
    console.log(frame)
    if (gTotal == 0) {
      fixationArea.style.top = "5%";
      fixationArea.style.left = "5%";
      fixationArea.style.visibility = "visible";
    }

    if (gTotal == 100) {
      fixationArea.style.left = "45%";
    }

    if (gTotal == 200) {
      fixationArea.style.left = "90%";
    }

    if (gTotal == 300) {
      fixationArea.style.top = "45%";
      fixationArea.style.left = "5%";
    }

    if (gTotal == 400) {
      fixationArea.style.left = "45%";
    }

    if (gTotal == 500) {
      //center right
      fixationArea.style.left = "90%";
    }

    if (gTotal == 600) {
      //bottom left
      fixationArea.style.top = "85%";
      fixationArea.style.left = "5%";
    }

    if (gTotal == 700) {
      //bottom center
      fixationArea.style.left = "45%";
    }

    if (gTotal == 800) {
      //bottom right
      fixationArea.style.left = "90%";
    }

    if (gTotal == 900) {
      fixationArea.style.left = "45%";
      fixationArea.style.top = "45%";
    }

    if (gTotal > 1000) {
      document.getElementById('dot').style.width = "200px";
      fixationArea.style.left = "40%";

      if (gArea >= 500){
        fixationArea.innerHTML = "<p>Press Space bar to continue</p>";
      } else {
        fixationArea.innerHTML = "<p>Failed calibration! press Q to reboot</p>";
      }
    }

    var position = getPosition(fixationArea);

    var check = checkArea(position.x, position.y, frame.average);
    if (check) {
      gArea += 1;
    }

    gTotal += 1;
  })

    window.onkeypress = function(e) {
    console.log(e);
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