const { Router } = require('express')
const router = Router()
const Book = require('../models/book')

router.post('/', async (req, res) => {
        try {
           const { title, author, genre, about, url } = req.body
           const isAvailable = false || !!(req.body.isAvailable)
           req.session.registerData = { title, author, genre, about }

           const previewUrl = req.file.path || ' '

           const book = new Book({
            title,
            author,
            genre,
            about,
            url,
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