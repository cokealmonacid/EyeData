document.addEventListener("DOMContentLoaded", function(event) { 
	var config = {
    	apiKey: "AIzaSyD1-dIvlZFDVLAtU_tPjEBe2zu45Aw0hWQ",
    	authDomain: "eyedata-29fce.firebaseapp.com",
    	databaseURL: "https://eyedata-29fce.firebaseio.com",
    	storageBucket: "eyedata-29fce.appspot.com",
    	messagingSenderId: "699419535521"
  	};
  firebase.initializeApp(config);
  var dbref = new firebase.database();

	var testFile = localStorage.getItem("test-file");
  var testName = localStorage.getItem("test-name");
	var testTime = localStorage.getItem("test-time");
  var image = localStorage.getItem("image");
	var gazeTotal = 0;

  var imageTest = document.getElementById('image');
  imageTest.style.maxHeight = screen.height;
  
  imageTest.innerHTML = "<img id='image-test'  src='"+testFile+"'>";

  	EyeTribe.loop(function(frame) {
  		if (gazeTotal <= (testTime*30)) {
        data = [frame.timestamp, frame.leftEye.average, frame.rightEye.average];
        dbref.ref('data').child(testName).push(data);
  		} else {

        data = [testTime, image, screen.height, screen.width];
        dbref.ref('data').child(testName+'_config').push(data);
        document.body.style.background = "none";
        document.body.innerHTML = "<p>Test Complete!</p>";
        document.body.style.textAlign = "center";
        document.body.style.paddingTop = "200px";
        localStorage.removeItem("test-file");
        localStorage.removeItem("test-time");
        localStorage.removeItem("test-name");
        localStorage.removeItem("image");
      }

      gazeTotal += 1;
  	})
});