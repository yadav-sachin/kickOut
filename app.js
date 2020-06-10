const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');

const serverPort = process.env.PORT || 3000;
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(serverPort, () => {
    console.log('Server started at http://localhost:'+ serverPort);
})