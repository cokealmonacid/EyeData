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

    /*

    screen.loadURL(`file://${__dirname}/test/lookingPosition.html`);

    screen.setResizable(true);
    screen.setFullScreen(true);

    */
   
}

