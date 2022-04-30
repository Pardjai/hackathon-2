const { Router } = require("express");
const Book = require("../models/book");
const router = Router();

router.get("/", async (req, res) => {
   try {
      const books = await Book.find();
      const preValues = await Book.find().select("genre");
      let allValues = preValues.map((book) => book.genre);
      allValues = [...new Set(allValues)];
      const activeValues = allValues;
      const user = req.session.user;

      res.render("genres", {
         title: "Жанры",
         isGenres: true,
         books,
         allValues,
         activeValues,
         user,
      });
   } catch (err) {
      console.log(err);
   }
});

router.get("/:title", async (req, res) => {
   try {
      const books = await Book.find();
      const genre = req.params.title;
      const filteredBooks = books.filter((book) => book.genre == genre);
      res.render("books", {
         title: "Книги",
         isBooks: true,
         books: filteredBooks,
      });
   } catch (err) {
      console.log(err);
   }
});

module.exports = router;
