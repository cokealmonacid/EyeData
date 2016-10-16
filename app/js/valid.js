function isValid($input) {
	var $validate = $input.value;
	var $feedback = '<p>Required Value</p>';

	if ($validate.length == 0) {
		if ($input.id == 'testTime' || $input.id == 'testName' || $input.id == 'testFile') {
			document.getElementById($input.id + '-feedback').innerHTML = $feedback;
			return false;
		}
	} else {
		document.getElementById($input.id + '-feedback').innerHTML = '';
		return true;
	}
}