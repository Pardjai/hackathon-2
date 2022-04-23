const { Router } = require('express')
const Book = require('../models/book')
const router = Router()

router.get('/', async (req, res) => {
    const books = await Book.find()
    const preValues = await Book.find().select('genre')
    let allValues = preValues.map(book => book.genre)
    allValues = [...new Set(allValues)]
    const activeValues = allValues
    const user = req.session.user
    
    res.render('genres', {
       title: 'Жанры',
       isGenres: true,
       books,
       allValues,
       activeValues,
       user
    })
})

module.exports = router