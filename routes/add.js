const { Router } = require('express')
const router = Router()
const Book = require('../models/book')

router.get('/', (req, res) => {
   res.render('add', {
      title: 'Добавление книги',
   })
})

router.post('/', async (req, res) => {
        try {
           const { title, author, genre, about, url, publisher, year } = req.body
           const isAvailable = false || !!(req.body.isAvailable)
           req.session.registerData = { title, author, genre, about }

           const previewUrl = req.file.path || ' '

           const book = new Book({
            title,
            author,
            genre,
            about,
            url,
            publisher,
            year,
            previewUrl,
            isAvailable,
           })

           await book.save()
           res.redirect('/profile')
        } catch (err) {
           throw err
        }
})

module.exports = router