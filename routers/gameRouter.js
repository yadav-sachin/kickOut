const router = require('express').Router();
const gameConstroller = require('./../controllers/gameController');
const redirectAuthenticated = require('./../middlewares/redirectAuthenticated');

router.get('/create', (req, res) => {
    res.render('dashboard');
});

///POST --- Create the game 
router.post('/create', redirectAuthenticated, gameConstroller.validateGame, gameConstroller.createGame);


module.exports = router;