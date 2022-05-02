const { Router } = require("express");
const router = Router();
const Book = require("../models/book");
const isLibrarian = require("../middlewares/isLibrarian");
const isAuth = require("../middlewares/auth");
const { validationResult } = require("express-validator");
const { bookValidators } = require("../utils/validators");

router.get("/", isAuth, isLibrarian, (req, res) => {
   res.render("add", {
      title: "Добавление книги",
   });
});

router.post("/", bookValidators, isAuth, isLibrarian, async (req, res) => {
   try {
      if (req.body === {}) {
         throw "Пустой req.body на роутере /add (POST)";
      }

      const errors = validationResult(req);
         if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).redirect("/add");
         }

      const { title, author, genre, about, url, publisher, year, inAvailable } =
         req.body;
      req.session.registerData = { title, author, genre, about };

      const previewUrl = req.file.path || " ";

      const book = new Book({
         title,
         author,
         genre,
         about,
         url,
         publisher,
         year,
         previewUrl,
         inAvailable,
      });

      await book.save();
      res.redirect("/books");
   } catch (err) {
      console.log(err);
   }
});

module.exports = router;
