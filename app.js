// dependencies
const express = require('express'),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      Nexmo = require('nexmo'),
      socketio = require('socket.io');

// initialize app
const app = express();

// Environment
app.set('env', process.env.NODE_ENV || 'development');
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);

// Template Engine Setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public Dir Setup
app.use(express.static(__dirname + '/public'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Start Server
app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});