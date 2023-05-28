const express = require('express');
const app = express();
const ErrorHandler = require('./utils/ErrorHandler');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));

// config
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: 'backend/config/.env'
    });
}

// routes
const user = require('./controller/User');
app.use('/api/v2/user', user);

// its error handler
app.use(ErrorHandler);

module.exports = app;