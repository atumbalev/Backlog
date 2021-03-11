'use-strict';
(() =>{
	let loginForm = document.getElementById("login-form");
	loginForm.addEventListener("submit", login);
})();

function login(clickEvent) {
	clickEvent.preventDefault();
    clearErrorMessage()

    let email = document.getElementById("email").value.trim();
    if (email === '') {
        displayErrorMessage('Email is required');
        return;
    }

    let password = document.getElementById("password").value.trim();
    if (password === '') {
        displayErrorMessage('Password is required');
        return;
    }

    let formData = {};
    formData["email"] = email;
    formData["password"] = password;

    sendLoginRequest(formData)
}

function sendLoginRequest(formData)
{	var request = new XMLHttpRequest();
    // POST request is not allowed, so i use GET
	request.open('GET', 'resources/loginToken.json');
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.addEventListener("load", () => LoginResponse(request));
	request.send(formData);
}

function LoginResponse(xhr)
{
	const OK_CODE = 200;

	let responseCode = xhr.status;
	let responseText = JSON.parse(xhr.responseText)

	if (responseCode === OK_CODE && responseText.success) {
		window.location = 'backlog.html';
	} else {
		alert("Login failed!");
	}
}

function clearErrorMessage() {
    let errorMessages = document.getElementById('error-message')
    errorMessages.innerHTML = '';
}

function displayErrorMessage(message) {
    let errorMessages = document.getElementById('error-message')
    errorMessages.innerHTML = message;
}