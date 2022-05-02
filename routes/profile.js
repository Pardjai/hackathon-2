const { Router } = require("express");
const router = Router();
const isAuth = require("../middlewares/auth");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const { profileValidators } = require("../utils/validators");

router.get("/", isAuth, async (req, res) => {
   try {
      if (!req.session.user) {
         throw "Отсутствует req.session.user. на роутере /profile (GET)";
      }
      if (!req.session.user._id) {
         throw "Отсутствует req.session.user._id на роутере /profile (GET)";
      }

      const user = await User.findById(req.session.user._id);
      res.render("profile", {
         title: "Профиль",
         isProfile: true,
         user,
      });
   } catch (err) {
      console.log(err);
      res.redirect("/");
   }
});

router.get("/settings/:id", isAuth, (req, res) => {
   try {
      const userId = req.params.id;
      res.render("settings", {
         title: "Настройки",
         userId,
      });
   } catch (err) {
      console.log(err);
   }
});

router.post("/settings/:id", profileValidators, isAuth, async (req, res) => {
   
   const errors = validationResult(req);
         if (!errors.isEmpty()) {
            console.log(errors);
            req.flash("profileError", errors.array()[0].msg);
            return res.status(422).redirect(`/profile/settings/${req.params.id}`);
         }

   try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      const toChange = {
         name: req.body.name || user.name,
      };

      if (req.file) {
         toChange.avatarUrl = req.file.path;
      }
      Object.assign(user, toChange);
      await user.save();
      req.session.user = user;
      res.redirect("/profile");
   } catch (e) {
      console.log(e);
   }
});

module.exports = router;
