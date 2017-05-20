//подготовить запрос
var prepareSend = function(url, form, data, cb) {
	let resultContainer = form.querySelector('.status');
	resultContainer.innerHTML = 'Sending...';
	sendAjax(url, data, function (data) {
		form.reset();
		resultContainer.innerHTML = data;
		if (cb) {
			cb(data);
		}
	});
};
