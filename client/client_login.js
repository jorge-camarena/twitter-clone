const userName = document.getElementById('username-input');
const password = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', getUsernameAndPassword);

function getUsernameAndPassword() {
    const usernameText = userName.value;
    const passwordText = password.value;
    console.log(usernameText);
    console.log(passwordText);

    const data = {
        UserName: usernameText,
        Password: passwordText
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:5000/api/login', options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.login) {
            localStorage.setItem('SessionToken', data.token)
            localStorage.setItem('FullName', data.FullName)
            localStorage.setItem('UserName', data.UserName);
            console.log(data.FullName)
            
            window.location.href = 'http://localhost:5000/index.html'

        }
        
    })
    const myToken = localStorage.getItem('SessionToken')
    console.log(myToken);
    
}