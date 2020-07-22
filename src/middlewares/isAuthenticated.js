module.exports = async function (req, res, next) {
    console.log('Checking Authentication');
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Authentication failed');
    res.redirect('/user/login')
}
