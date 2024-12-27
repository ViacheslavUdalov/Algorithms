import socket from "./socketProvider.js";

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.addEventListener('submit', handleLoginForm);
    registerForm.addEventListener('submit', handleRegisterForm);

    const registerLink = document.getElementById('register-link');
    registerLink.addEventListener('click', showRegister);

    const loginLink = document.getElementById('login-link');
    loginLink.addEventListener('click', showLogin);
});

function showRegister() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function handleRegisterForm(event) {
    event.preventDefault();
    const email = document.getElementById('reg-email').value;
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const role = document.getElementById('reg-role').value;
    const data = {
        email,
        username,
        password,
        role
    }
    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }
    const dataToSend = {
        type: 'register',
        data
    }
    ws.send(JSON.stringify(dataToSend));


}

function handleLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const data = {
        email,
        password
    }
    const dataToSend = {
        type: 'login',
        data
    }

    ws.send(JSON.stringify(dataToSend));
}

const ws = socket;

ws.onopen = function (event) {
};
ws.onmessage = function (event) {
    let jsondata = JSON.parse(event.data);
    console.log(`jsondata`, jsondata)
    switch (jsondata.type) {
        case 'register' :
        case 'login' :
            console.log(jsondata)
            localStorage.setItem('token', JSON.stringify(jsondata.message.token))
            localStorage.setItem('username', JSON.stringify(jsondata.message.userData.username))
            // window.location.href = '/';
            break;
        case 'notification' :
            console.log('notification')
            console.log(jsondata)
            const outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        default:
            console.log(jsondata)
            console.log('не выполнен ни один из кейсов');
    }
}; 
