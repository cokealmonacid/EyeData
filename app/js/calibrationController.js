document.addEventListener("DOMContentLoaded", function(event) { 
	var remote = require('electron').remote;

	var delay=1500; 

	setTimeout(function() {

		var control = true;

		var body = document.body;
		body.style.background = "url(../app/img/dot.png) no-repeat";
		body.style.backgroundSize =  "60px";

		var cont = 1;

		setInterval(function(){
			switch(cont) {
				case 1:
					body.style.backgroundPosition = "left top";
					break;
				case 2:
					body.style.backgroundPosition = "right top";
					break;
				case 3:
					body.style.backgroundPosition = "left bottom";
					break;
				case 4:
					body.style.backgroundPosition = "right bottom";
					break;
				case 5:
					body.style.backgroundPosition = "center center";
					break;
			}

			cont += 1;
		} , 3000);

	}, delay);
});

