const numberInput = document.getElementById('number');
const  textInput = document.getElementById('msg');
const  button = document.getElementById('button');
const  responseField = document.getElementById('responseField');

// send text
button.addEventListener('click', send, false);

// socket.io
const socket = io();
socket.on('incomingSms', (data) => {
    updateIncomingMessageUI(data.from, data.text);
});

socket.on('smsStatus', (data) => {
    console.log('success');
});

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;

    updateOutgoingMessageUI(number, text);

    // fetch('/', {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         number: number,
    //         text: text
    //     })
    // })
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
}

updateOutgoingMessageUI = (number, text) => {

    var now = new Date();
    function hours12() {
         return (now.getHours() + 24) % 12 || 12; 
        }

    let time = `${hours12()}:${now.getMinutes()}`;

    let li = document.createElement('li');
    li.classList.add('outgoing');
    li.innerHTML = `${number} -- ${text} <span class="date">${time}</span>`;
    responseField.appendChild(li);
}

updateIncomingMessageUI = (number, text) => {
    var now = new Date();

    let time = `${(now.getHours() + 24) % 12 || 12}:${now.getMinutes()}`;

    let li = document.createElement('li');
    li.classList.add('incoming');
    li.innerHTML = `${number} -- ${text} <span class="date">${time}</span>`;
    responseField.appendChild(li);
}
