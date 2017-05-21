//Login
(function() {
	document.addEventListener("DOMContentLoaded", function() {
		const loginForm = document.querySelector("#loginForm");

		if(loginForm) {
			loginForm.addEventListener("submit", login);
		}

		function login(e) {
			e.preventDefault();
			let data = {
				login: loginForm.login.value,
				password: loginForm.password.value
			};

			prepareSend("/login", loginForm, data, function(data) {
				if(data === "Авторизация успешна!") {
					location.href = "/admin";
				}
			});
		}
	});
})();

//prepareSend
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

//Ajax
var sendAjax = function(url, data, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    let result;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb('Извините в данных ошибка');
    }
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
};