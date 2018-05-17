const numberInput = document.getElementById('number');
const  textInput = document.getElementById('msg');
const  button = document.getElementById('button');
const  response = document.getElementById('response');

// send text
button.addEventListener('click', send, false);

// socket.io
const socket = io();
socket.on('smsStatus', (data) => {
    response.innerHTML = `<h5>Text message sent to ${data.number}</h5>`
});

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;

    fetch('/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: number,
            text: text
        })
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}
