module.exports = function (req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated;
    res.locals.isLibrarian = req.session.isLibrarian
    res.locals.user = req.session.user

    next();
 };