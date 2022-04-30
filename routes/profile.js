const { Router } = require('express')
const router = Router()
const isAuth = require('../middlewares/auth')
const User = require('../models/user')

router.get('/', isAuth, async (req, res) => {
   const user = await User.findById(req.session.user._id)
   res.render('profile', {
      title: 'Профиль',
      isProfile: true,
      user,
   })
})

router.get('/settings/:id', isAuth, (req, res) => {
   const userId = req.params.id
   res.render('settings', {
      title: 'Настройки',
      userId
   })
})

router.post('/settings/:id', isAuth, async (req, res) => {
   try {
   const userId = req.params.id
   const user = await User.findById(userId)
   const toChange = {
      name: req.body.name || user.name
   }

   if (req.file){
      toChange.avatarUrl = req.file.path
   }
   console.log(req.file.path);
   Object.assign(user, toChange)
   await user.save()
   req.session.user = user
   res.redirect('/profile')
} catch (e) {
   console.log(e);
} 
})


module.exports = router
