const router = require('express').Router();
const gameController = require('./../controllers/gameController');
const isAuthenticated = require('./../middlewares/isAuthenticated');

router.get('/create', isAuthenticated, (req, res) => {
    res.render('createGame');
});

///POST --- Create the game 
// router.post('/create', isAuthenticated, gameConstroller.validateGame, gameConstroller.createGame);
router.post('/create', isAuthenticated, gameController.validateGame, gameController.createGame);


router.get('/join/:gameId', isAuthenticated, gameController.joinGame);

router.get('/game/api/:gameId', isAuthenticated, gameController.getGameData);



module.exports = router;