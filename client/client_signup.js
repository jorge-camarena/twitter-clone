const fullName = document.getElementById('fullname-input');
const userName = document.getElementById('username-input');
const password = document.getElementById('password-input');
const loginBtn = document.getElementById('signup-btn');

loginBtn.addEventListener('click', getUsernameAndPassword);

function getUsernameAndPassword() {
    const fullNameText = fullName.value;
    const usernameText = userName.value;
    const passwordText = password.value;
    console.log(usernameText);
    console.log(passwordText);
    console.log(fullNameText);

    const data = {
        FullName: fullNameText,
        UserName: usernameText,
        Password: passwordText
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:5000/api/createUser', options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            window.location.href = 'http://localhost:5000/login.html'
        }
    }) 
}