const express = require('express');
require('./db/db');
const userRouter = require('./routers/userRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));
app.use('/user', userRouter);

app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    res.redirect('/user');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
    console.log('Server started ' + serverPort);
})