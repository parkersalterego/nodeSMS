const numberInput = document.getElementById('number');
const  textInput = document.getElementById('msg');
const  button = document.getElementById('button');
const  response = document.getElementById('response');

button.addEventListener('click', send, false);

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