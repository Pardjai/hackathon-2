const { Router } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const keys = require('../keys')
const smtpTransport = require('../emails/mailTransport')
const regEmail = require('../emails/mailOptions/registration')
const { validationResult } = require('express-validator')
const {
   registerValidators,
   loginValidators,
} = require('../utils/validators')
const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login', {
       title: 'Авторизация',
       isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
       res.redirect('/auth/login#login')
    })
 })

 router.post('/login', /*loginValidators,*/ async (req, res) => {
    try {
       const { email, password } = req.body
       req.session.loginData = {email}
 
       const errors = validationResult(req)
       if (!errors.isEmpty()) {
          console.log(errors)
          req.flash('loginError', errors.array()[0].msg)
          return res.status(422).redirect('/auth/login#login')
       }
 
       const candidate = await User.findOne({ email })
       const areSame = await bcrypt.compare(password, candidate.password)
 
       if (areSame) {
          req.session.user = candidate
          req.session.isAuthenticated = true
          req.session.isLibrarian = candidate.isLibrarian || false
          req.session.save((err) => {
             if (err) {
                throw err
             }
             res.redirect('/')
          })
       } else {
          req.flash('loginError', 'Неверный пароль')
          res.redirect('/auth/login#login')
       }
    } catch (err) {
       throw err
    }
 })
 router.post('/register', /*registerValidators,*/ async (req, res) => {
    try {
       const { name, email, password } = req.body
       req.session.registerData = { name, email }
       const errors = validationResult(req)
       if (!errors.isEmpty()) {
          req.flash('registerError', errors.array()[0].msg)
          return res.status(422).redirect('/auth/login#register')
       }
       const hashPassword = await bcrypt.hash(password, 12)
       const user = new User({
         name,
         email,
         password: hashPassword,
       })
       await user.save()
       smtpTransport.sendMail(regEmail(email), (err, res) => {
          err ? console.log(err) :
          smtpTransport.close()
       })
       res.redirect('/auth/login#login')
    } catch (err) {
       throw err
    }
 })

module.exports = router