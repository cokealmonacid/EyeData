document.addEventListener("DOMContentLoaded", function(event) { 
	testFile = localStorage.getItem("test-file");

	document.body.style.background = "url('"+testFile+"') no-repeat center";
});