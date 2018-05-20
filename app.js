// dependencies
const express = require('express'),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      Nexmo = require('nexmo'),
      socketio = require('socket.io');

require('dotenv').config();

// Init Nexmo
const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_KEY,
    apiSecret: process.env.NEXMO_SECRET
}, {debug: true});

// initialize app
const app = express();

// Environment
app.set('port', process.env.PORT || 3000);

// Template Engine Setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public Dir Setup
app.use(express.static(__dirname + '/public'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Catch Form Submit
app.post('/', (req, res) => {
    // res.send(req.body);
    // console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;

    handleMessage(text, number);

    nexmo.message.sendSms('12018993151', number, text, {type: 'unicode'}, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            // Get Data From Response
            const data = {
                id: res.messages[0]['message-id'],
                number: res.messages[0]['to'],
            }

            // Emit to the client
            io.emit('smsStatus', data);
        }
    });
});

// Incoming Messages
app.post('/inbound', (req, res) => {
    handleParams(req.body, res);
});

function handleParams(params, res) {
  if (!params.to || !params.msisdn) {
    console.log('This is not a valid inbound SMS message!');
  } else {
    console.log('Success');
    let incomingData = {
      messageId: params.messageId,
      from: params.msisdn,
      text: params.text,
      type: params.type,
      timestamp: params['message-timestamp']
    };
    res.send(incomingData);
    io.emit('incomingSms', incomingData);
  }
  res.status(200).end();
}

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// Start Server
const server = app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});

// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('Socket Connection Initialized');
});

io.on('disconnect', () => {
    console.log('Socket Connection Terminated');
});

let handleMessage = (text, number) => {

    let queryValues = {
        command: '',
        task: '',
        contacts: []
    }

    text.split(' ').forEach((word) => {
        textEvaluator(word);
        queryEvaluator(queryValues);
    });
    
}

let textEvaluator = (word) => {
    if (word.charAt(0) == '!') {
        queryValues.command = word;
    }
    else if (word.charAt(0) == '@') {
        queryValues.contacts.push(word);
    }
    else if (word.charAt(0) == 'schedule') {
        queryValues.task = word;
    }
}

let queryEvaluator = (queryObj) => {
    let command = queryObj.command !== '' ? queryObj.command : false;
    let task = queryObj.task !== '' ? queryObj.task : false;
    let contacts = queryObj.contacts.length > 0 ? queryObj.contacts : false;

    if (command != false && task != false && contacts != false) {
        
    }
}

