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
    socket.send(JSON.stringify(dataToSend));
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
    socket.send(JSON.stringify(dataToSend));
}
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function (event) {
};

socket.onmessage = function (event) { 
    let jsondata = JSON.parse(event.data);

    switch (jsondata.type) {
        case 'register' :
            console.log(jsondata)
            localStorage.setItem('token', JSON.stringify(jsondata.message.token))
            break;
        case 'login' :
            console.log(jsondata)
            localStorage.setItem('token', JSON.stringify(jsondata.message.token))
            break;
        default:
            console.log(jsondata)
            console.log('не выполнен ни один из кейсов');
    }
};
