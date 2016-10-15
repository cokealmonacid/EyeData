var remote = require('electron').remote;

button.onclick = function testFunction(){  
	/*
    var screen = remote.getCurrentWindow();
    screen.setResizable(true);
    screen.setFullScreen(true);
    */

    testTime = isValid(document.getElementById('testTime'));
    testName = isValid(document.getElementById('testName'));
    testFile = isValid(document.getElementById('testFile'));


    //console.log(testFile.files[0].name);
}

