import getSocket from "./socketProvider.js";
const socket = getSocket();

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');

    console.log(registerLink);
    console.log(loginLink);

    function showRegister() {
        console.log('click');
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';
    }

    function showLogin() {
        console.log('click');
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    }

    loginForm.addEventListener('submit', handleLoginForm);
    registerForm.addEventListener('submit', handleRegisterForm);

    registerLink.addEventListener('click', showRegister);
    loginLink.addEventListener('click', showLogin);
});





socket.onmessage = function (event) { 
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
    handleSendForRegAndLog(dataToSend)
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
    handleSendForRegAndLog(dataToSend)
}

function handleSendForRegAndLog(dataToSend) {
    socket.send(JSON.stringify(dataToSend));
}