const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.use('/user', userRouter);

app.set('view engine', 'hbs');


app.get('/game', (req, res) => {
    res.render('game');
});
app.get('/', (req, res) => {
    res.redirect('/user');
});

const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
    console.log('Server started at http://localhost:'+ serverPort);
})