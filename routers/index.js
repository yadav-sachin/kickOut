const router = require('express').Router();
const userRouter = require('./userRouter');
// const gameRouter = require('./gameRouter');

router.get('/', (req, res) => {
    res.redirect('/user');
});

router.get('/game', (req, res) => {
    res.render('game');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.use('/user', userRouter);

// router.use('/game', gameRouter);

module.exports = router;