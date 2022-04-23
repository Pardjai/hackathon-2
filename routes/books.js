const { Router } = require('express')
const Book = require('../models/book')
const router = Router()

router.get('/:id', async(req, res) => {
    const book = await Book.findById(req.params.id)
    const {title, author, previewUrl, about} = book
    const isAvailable = book.isAvailable ? 'Есть' : 'Нет'

    res.render('book', {
        title,
        author,
        previewUrl,
        about,
        isAvailable
    })
})

router.get('/:id/edit', async(req, res) => {
    const book = await Book.findById(req.params.id)
    const {title, author, genre, about, url, previewUrl, isAvailable} = book
    const id = req.params.id

    res.render('book-edit', {
        title,
        author,
        genre,
        about,
        url,
        previewUrl,
        isAvailable,
        id
    })
})

router.post('/', async (req, res) => {
    const preValues = await Book.find().select('genre')
    const allValues = preValues.map(book => book.genre)
    const activeValues = Object.values(req.body) == 0 ? allValues : Object.values(req.body)

    const books = await Book.find()
    const filteredBooks = books.filter(book => activeValues.includes(book.genre))
    res.render('books', {
        title: 'Книги',
        isBooks: true,
        books : filteredBooks,
        allValues,
        activeValues,
     })
})

router.post('/edit', async (req, res) =>{
    try{
    const { id } = req.body
    delete req.body.id

    const book = await Book.findById(id)
    req.body.isAvailable  = false || !!(req.body.isAvailable) 

    Object.assign(book, req.body)
    await book.save()
    res.redirect('/books')
    } catch(e){
        console.log(e);
    }
})

router.post('/remove', async (req, res) => {
    try {
       await Book.deleteOne({
          _id: req.body.id,
       }) // объект, передаваемый функции deleteOne содержит поле сравнения
       res.redirect('/books')
    } catch (err) {
       console.log(err)
    }
 })

module.exports = router