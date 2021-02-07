//Handle making POST Request on Tweet
const tweetNode = document.getElementById('input-tweet');
const submitTweet = document.getElementById('tweet-btn');
const signOutBtn = document.getElementById('singout-btn');
console.log(localStorage.getItem('SessionToken'))
console.log(localStorage.getItem('FullName'));
console.log(localStorage.getItem('UserName'))


submitTweet.addEventListener('click', postTweet);
signOutBtn.addEventListener('click', signOut);

function postTweet() {
    const tweetContent = tweetNode.value;
    loadTweet(localStorage.getItem('FullName'), tweetContent);
    const data = {
        FullName: localStorage.getItem('FullName'),
        UserName: localStorage.getItem('UserName'),
        content: tweetContent,
        likes: 10
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
            'auth-token': localStorage.getItem('SessionToken')
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:5000/api/post-tweet', options);
    console.log(tweetContent);
}

//HANDLE SEARCHING FOR PEOPLE (FRONT-END)
const searchNode = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', searchPerson);

function searchPerson() {
    const person = searchNode.value;
    console.log(person);
}

//HANDLES LOADING ALL TWEETS FROM DATABASE
function loadTweet(user, text) {
    const parentNode = document.getElementById('feed');

    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card')
    cardDiv.setAttribute('id', 'card-tweet');
    const bodyDiv = document.createElement('div');
    bodyDiv.setAttribute('class', 'card-body');
    const userName = document.createElement('h5');
    userName.setAttribute('class', 'card-title');
    userName.innerText = user;
    const time = document.createElement('h6');
    time.setAttribute('class', "card-subtitle mb-2 text-muted")
    time.innerText = '2 minutes ago';
    const content = document.createElement('p');
    content.innerText = text;
    bodyDiv.appendChild(userName);
    bodyDiv.appendChild(time);
    bodyDiv.appendChild(content);
    cardDiv.appendChild(bodyDiv);
    parentNode.insertBefore(cardDiv, parentNode.firstChild);
}

function loadAllTweets() {
    const options = {
        method: 'GET',
        headers: {
            'Content': 'application/json',
            'auth-token': localStorage.getItem('SessionToken')
        }
    }
    fetch('http://localhost:5000/api/get-tweets', options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var i;
        for (i = 0; i < Object.keys(data).length; i++) {
            var name = data[i].FullName;
            var content = data[i].content;
            loadTweet(name, content);
            console.log(data.FullName);

        };
    });

}
function signOut() {
    localStorage.clear();
    window.location.href = 'http://localhost:5000/login.html'
}

function checkValidSession() {
    options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('SessionToken')
        }
    }
    fetch('http://localhost:5000/api/validateSession', options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.auth === false) {
            window.location.href = 'http://localhost:5000/login.html';
        }
    })
}

//CUSTOMIZE HOMEPAGE FOR SPECIFIC USER
const userTitle = document.getElementById('user-title')
function loadHomePage() {
    userTitle.innerText = localStorage.getItem('FullName');
    loadAllTweets();
}


loadHomePage();
window.onload = checkValidSession();