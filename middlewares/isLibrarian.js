module.exports = function (req, res, next){
    if(!req.session.isLibrarian){
        return res.redirect('/')
    }

    next()
}