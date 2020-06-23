const express = require('express');
require('dotenv').config();
require('./config/db');
const session = require('express-session');
const flash = require('express-flash');
const hbs = require('hbs');
const path = require('path');
const passport = require('passport');
const indexRouter = require('./routers/index');

const app = express();
require('./config/passport')(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
// app.use(express.cookieParser('SESSION_SECRET_KEY'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static('public'));

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname + '/views/partials'));
app.use('/', indexRouter);


const serverPort = process.env.PORT || 9000;
app.listen(serverPort, () => {
    console.log('Server started ' + serverPort);
});