document.addEventListener("DOMContentLoaded", function(event) { 
	var config = {
    	apiKey: "AIzaSyD1-dIvlZFDVLAtU_tPjEBe2zu45Aw0hWQ",
    	authDomain: "eyedata-29fce.firebaseapp.com",
    	databaseURL: "https://eyedata-29fce.firebaseio.com",
    	storageBucket: "eyedata-29fce.appspot.com",
    	messagingSenderId: "699419535521"
  	};
  firebase.initializeApp(config);
  var dbref = new firebase.database().ref('data').orderByKey();

	var testFile = localStorage.getItem("test-file");
	var testTime = localStorage.getItem("test-time");
	var gazeTotal = 0;

  var imageTest = document.getElementById('image');
  imageTest.style.maxHeight = screen.height;
  
  imageTest.innerHTML = "<img id='image-test'  src='"+testFile+"'>";

  	EyeTribe.loop(function(frame) {
  		if (gazeTotal <= (testTime*30)) {
        console.log(frame);
  		} else {
        document.body.style.background = "none";
        document.body.innerHTML = "<p>Test Complete!</p>";
        localStorage.removeItem("test-file");
        localStorage.removeItem("test-time");
        localStorage.removeItem("test-name");
      }

      gazeTotal += 1;
  	})
});