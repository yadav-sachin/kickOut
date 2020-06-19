const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const checkLogin = require('../middlewares/checkLoginMiddleware');
const router = express.Router();
const userController = require('../controllers/userController');

// GET requests
router.get('/', (req, res) => res.redirect('/user/login'));
router.get('/signup', (req, res) => res.redirect('/user/login'));
router.get('/login', checkLogin, (req, res) => res.render('login', {loginErrors: [req.query.error]}) );
router.get('/verify/:username/:verificationCode', checkLogin, userController.verifyUser);
router.get('/setpassword', authMiddleware, (req, res) => res.render('setPassword'));

// POST Requests
router.post('/login' , checkLogin, userController.loginUser);
router.post('/signup', checkLogin, userController.signupUser);
router.post('/setpassword', authMiddleware, userController.setPassword);


module.exports = router;