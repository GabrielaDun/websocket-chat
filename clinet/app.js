const socket = io();

const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#message-section');
const messageList = document.querySelector('#messages-list')
const addMessageForm = document.querySelector('#add-messages-form')
const userNameInput = document.querySelector('#username')
const messageContentInput = document.querySelector('#message-content')

let userName = '';

socket.on('message', ({ author, content }) => addMessage(author, content));

function login(event) {
    event.preventDefault();
    if (userNameInput.value === '') {
        alert('Introducte yourself')
    } else {
        userName = userNameInput.value
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

function sendMessage(event) {
    event.preventDefault();
    if (messageContentInput.value === '') {
        alert('Write a message')
    } else {
        addMessage(userName, messageContentInput.value)
        socket.emit('message', { author: userName, content: messageContentInput.value })
        messageContentInput.value = ''
    }
}

function addMessage(author, message) {
    const list = document.createElement('li')
    list.className.add('message message--received');
    if (author === userName) message.classList.add('message-self');
    list.innerHTML = `
        <h3 class="message__author" >${userName === author ? 'You' : author}</h3>
        <div class="message__content"> ${content} </div>
        `;

}


loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
