'use strict';
(() =>{
	let registationForm = document.getElementById("registration-form");
	registationForm.addEventListener("submit", register);
})();

function register(clickEvent) {
	clickEvent.preventDefault();
    clearErrorMessage()
    try {
		let email = document.getElementById("email").value.trim();
        validateEmail(email);
		let username = document.getElementById("username").value.trim();
        validateUsername(username);
		let password = document.getElementById("password").value.trim();
        validatePassword(password);
		

		let confirmedPassword = document.getElementById("confirm-password").value.trim();
		checkIfPasswordsMatch(password, confirmedPassword);

		let formData = {};
		formData["emai"] = email;
		formData["username"] = username;
		formData["password"] = password;

		sendRegisterRequest(formData)

	} catch (exception) {
		displayErrorMessage(exception);
	}
}

function sendRegisterRequest(formData)
{	var request = new XMLHttpRequest();
	// POST request is not allowed, so i use GET
	request.open('GET', 'resources/registerToken.json');
	request.addEventListener("load", () => registerResponse(request));
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(formData);
}

function registerResponse(xhr)
{
	const OK_CODE = 200;

	let responseCode = xhr.status;
	let responseText = JSON.parse(xhr.responseText)

	if (responseCode === OK_CODE && responseText.success) {
		window.location = 'backlog.html';
	} else {
		alert("Registration failed!");
	}
}

function validateEmail(email) {
    const pattern = `^[A-Za-z0-9]+@[a-z]+\.[a-z]+$`;
	const regex = new RegExp(pattern);

	if (email === "") {
		throw "You must enter an email address";
	}

	if (!email.match(regex)) {
		throw "Invalied email format";
	}
}

function validateUsername(username) {
    const pattern = `^[a-zA-Z0-9]+$`;
	const regex = new RegExp(pattern);

	if (username === "") {
		throw "You must enter a username";
	}

	if (!username.match(regex)) {
		throw "The username must contain only letters and numbers";
	}
}

function validatePassword(password) {
    const pattern = `^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`;
	const regex = new RegExp(pattern);

	if (password === "") {
		throw "You must enter a username";
	}

	if (!password.match(regex)) {
		throw "The password must contain an upper case letter, a lower case letter and a number and be at least 8 characters";
	}
}

function checkIfPasswordsMatch(password, confirmedPassword)
{
	if (password !== confirmedPassword) {
		throw "The password and the confirmed password don't match";
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