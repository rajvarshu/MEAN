const express = require('express');
const app = express();
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
// JWT utils
const verifyAuthToken = require('./common/jwt.utils');
// Configuration related
const config = require('config');
// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log'),
    compress: "gzip" // compress rotated files
});
// MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/practice', {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        console.log('Connect to mongoDb....');
    })
    .catch((err) => {
        console.log('Error in connecting mongoDb >> ', err);
    });
// Register routers
const loginRouter = require('./routes/login-route');
const homeRouter = require('./routes/home-route');
const licensesRouter = require('./routes/licenses-route');
const devicesRouter = require('./routes/devices-route');
const personsRoute = require('./routes/persons-route');
const studentRoute = require('./routes/students-route');
// setup the logger
// app.use(morgan('dev', { stream: accessLogStream }));
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(bodyParser.json());
// log all requests to access.log
app.use(morgan('common', {
    stream: accessLogStream
}))
app.use(express.json());

// JWT middleware
app.use((req,res, next) => {
    // TODO: Pickup whitelisted routes from constants file
    if (!(req.url.includes('/login'))) {
        verifyAuthToken(req, res, next);
        console.log('success!!!');
    } else {
        next();
    }
})
// Middle ware
app.use(logger);
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

app.use(morgan('tiny'));
// Register API Paths
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/persons', personsRoute);
app.use('/students/', studentRoute)
app.use('/license', licensesRouter);
app.use('/devices', devicesRouter);

console.log(app.get('env'));
console.log(config.get('mongoDB.host'));
console.log(config.get('mongoDB.pwd'))

app.listen(3000, () => {
    console.log('Server listening on port no 3000');
})