document.addEventListener("DOMContentLoaded", function(event){
	var h = window.innerHeight;
	var w = window.innerWidth;
	var firstTime = true;

	var config = {
    	apiKey: "AIzaSyD1-dIvlZFDVLAtU_tPjEBe2zu45Aw0hWQ",
    	authDomain: "eyedata-29fce.firebaseapp.com",
    	databaseURL: "https://eyedata-29fce.firebaseio.com",
    	storageBucket: "eyedata-29fce.appspot.com",
    	messagingSenderId: "699419535521"
  	};

  	firebase.initializeApp(config);
  	var dbref = new firebase.database();

	var imageTest = localStorage.getItem("image");
	var testFile = localStorage.getItem("test-file");
	var testName = localStorage.getItem("test-name");
	var testTime = localStorage.getItem("test-time");
	var testDate = new Date().getTime();

	var image = document.getElementById('image-test');
	image.src = testFile;

	// setting styles
	image.style.maxHeight = '100%';
	image.style.maxWidth = '100%';
	image.style.width = 'auto';
	image.style.height = 'auto';
	image.style.position = 'absolute';
	image.style.top = '0';
	image.style.bottom = '0';
	image.style.left = '0';
	image.style.right = '0';
	image.style.margin = 'auto';

	// setting time
	var timeStartTest = getSeconds();

	EyeTribe.loop(function(frame) {

		var time = getSeconds();
		var timeInTest = time - timeStartTest;
		if (timeInTest < testTime) {
			data = [timeInTest, frame.average, frame.isFixated];
			dbref.ref('data').child(testName).push(data);
		} else {
			image.style.display = 'none';
			var textResponse = document.getElementById('message');
			textResponse.style.display = 'initial';
			textResponse.style.position = 'absolute';
			textResponse.style.top = (h/2) - (textResponse.offsetHeight/2) + 'px';
			textResponse.style.left = (w/2) - (textResponse.offsetWidth/2) + 'px';

			if (firstTime) {
				data = [testName, imageTest, testTime, testDate, h, w];
				dbref.ref('data').child(testName+'_config').push(data);
				firstTime = false;
			}
		}
	});

});

function getSeconds() {
	var d = new Date();
	var n = d.getSeconds();
	return n;
}