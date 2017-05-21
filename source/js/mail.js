//Send mail

const formMail = document.querySelector('#mail');

if (formMail) {
  formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
  e.preventDefault();
  let data = {
    name: formMail.name.value,
    email: formMail.email.value,
    text: formMail.text.value
  };
  prepareSend('/works', formMail, data);
}

function prepareSend(url, form, data, cb) {
  let resultContainer = form.querySelector('.status');
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson(url, data, function (data) {
    form.reset();
    resultContainer.innerHTML = data;
    if (cb) {
      cb(data);
    }
  });
}