const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const redirectAuthenticated = require('../middlewares/redirectAuthenticated');
const userController = require('../controllers/userController');
const passport = require('passport');

// GET requests
router.get('/', (req, res) => res.redirect('/user/login'));
router.get('/signup', redirectAuthenticated, (req, res) => res.redirect('/user/login'));
router.get('/login', redirectAuthenticated, (req, res) => res.render('login'));
router.get('/verify/:username/:verificationCode', redirectAuthenticated, userController.verifyUser);
router.get('/changepassword', isAuthenticated, (req, res) => res.render('changePassword'));
router.get('/dashboard',isAuthenticated,  (req, res) =>{ res.render('dashboard', {username: req.user.username}); });
router.get('/logout', isAuthenticated, (req, res)=> { req.logout(); res.redirect('/'); })

// POST Requests
router.post('/login',passport.authenticate('local', { successRedirect: '/user/dashboard', failureFlash: true, failureRedirect: '/user/login' }));
router.post('/signup', redirectAuthenticated, userController.signupUser);
router.post('/changepassword', isAuthenticated, userController.changePassword);

module.exports = router;