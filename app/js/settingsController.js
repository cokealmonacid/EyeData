var remote = require('electron').remote;

button.onclick = function testFunction(){  

    var screen = remote.getCurrentWindow();

    var testName = isValid(document.getElementById('testName'));
    var testTime = isValid(document.getElementById('testTime'));
    var testFile = isValid(document.getElementById('testFile'));

    if (!testName && !testTime && !testFile) {
    	return 0;
    }

    if (!isValid(document.getElementById('testName'))) {
    	return 0;
    }

    if (!isValid(document.getElementById('testTime'))) {
    	return 0;
    }

    if (!isValid(document.getElementById('testFile'))) {
    	return 0;
    }

    if (!getExtension(document.getElementById('testFile').value)) {
        return 0;
    }

    localStorage.setItem("test-file", document.getElementById('testFile').files[0].path);
    localStorage.setItem("test-name", document.getElementById('testName').value);
    localStorage.setItem("test-time", document.getElementById('testTime').value);

    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function (){
        image = reader.result;
        localStorage.setItem("image", image);
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        image = "";
    }

    screen.loadURL(`file://${__dirname}/calibration.html`);
    
    screen.setResizable(true);
    screen.setFullScreen(true);
}

