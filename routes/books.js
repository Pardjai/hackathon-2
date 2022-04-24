const { Router } = require('express')
const Book = require('../models/book')
const router = Router()

router.get('/', async (req, res) => {
    const books = await Book.find()

    res.render('books', {
        title: 'Книги',
        books,
    })
})

router.get('/:id', async(req, res) => {
    const book = await Book.findById(req.params.id)
    const {title, author, previewUrl, about, inAvailable, year} = book

    res.render('book', {
        title,
        author,
        previewUrl,
        about,
        year,
        inAvailable
    })
})

router.get('/:id/edit', async(req, res) => {
    const book = await Book.findById(req.params.id)
    const {title, author, genre, about, url, previewUrl, inAvailable, year, publisher} = book
    const id = req.params.id

    res.render('book-edit', {
        title,
        author,
        genre,
        about,
        url,
        previewUrl,
        inAvailable,
        year,
        publisher,
        id
    })
})

router.post('/', async (req, res) => {
    const preValues = await Book.find().select(['genre', 'publisher'])
    let allGenres = preValues.map(book => book.genre)
    let allPub = preValues.map(book => book.publisher)
    allGenres = [...new Set(allGenres)]
    allPub = [...new Set(allPub)]

    const activeValues = Object.keys(req.body) == 0 ? allValues : Object.keys(req.body)

    const activeGenres = allGenres.filter(value => activeValues.includes(value))
    const activePub = allPub.filter(value => activeValues.includes(value))
    


    const books = await Book.find()
    let filteredBooks = books.filter(book => activeGenres.includes(book.genre))
    filteredBooks = filteredBooks.filter(book => activePub.includes(book.publisher))

if(activeValues.includes('isAvailable')){
    filteredBooks = filteredBooks.filter(book => book.inAvailable > 0)
} else{
    filteredBooks = filteredBooks.filter(book => book.inAvailable === 0)
}

    res.render('books', {
        title: 'Книги',
        isBooks: true,
        books : filteredBooks,
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

 router.post('/search', async(req, res) => {
     let title = req.body.title
     title = title.toLowerCase()
     const books = await Book.find()
    const filteredBooks = books.filter(book => {
        bookTitle = book.title
        bookTitle = bookTitle.toLowerCase()
        return bookTitle.includes(title)
    })
    res.render('books', {
        title: 'Книги',
        books: filteredBooks,
    })
 })

module.exports = router