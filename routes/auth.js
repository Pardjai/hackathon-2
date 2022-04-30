const { Router } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const keys = require("../keys");
const smtpTransport = require("../emails/mailTransport");
const regEmail = require("../emails/mailOptions/registration");
const { validationResult } = require("express-validator");
const { registerValidators, loginValidators } = require("../utils/validators");
const router = Router();

router.get("/login", (req, res) => {
   res.render("auth/login", {
      title: "Авторизация",
      isLogin: true,
   });
});

router.get("/registration", (req, res) => {
   res.render("auth/registration", {
      title: "Регистрация",
      isLogin: true,
   });
});

router.get("/logout", async (req, res) => {
   try {
      req.session.destroy(() => {
         res.redirect("/auth/login#login");
      });
   } catch (err) {
      console.log(err);
   }
});

router.post(
   "/login",
   /*loginValidators,*/ async (req, res) => {
      try {
         if (req.body === {}) {
            throw "Пустой req.body на роутере /auth/login (POST)";
         }

         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            console.log(errors);
            req.flash("loginError", errors.array()[0].msg);
            return res.status(422).redirect("/auth/login#login");
         }

         const { email, password } = req.body;
         req.session.loginData = { email };

         const candidate = await User.findOne({ email });
         const areSame = await bcrypt.compare(password, candidate.password);

         if (areSame) {
            req.session.user = candidate;
            req.session.isAuthenticated = true;
            req.session.isLibrarian = candidate.isLibrarian || false;
            req.session.save((err) => {
               if (err) {
                  throw err;
               }
               res.redirect("/");
            });
         } else {
            req.flash("loginError", "Неверный пароль");
            res.redirect("/auth/login#login");
         }
      } catch (err) {
         console.log(err);
      }
   }
);
router.post(
   "/register",
   /*registerValidators,*/ async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            req.flash("registerError", errors.array()[0].msg);
            return res.status(422).redirect("/auth/login#register");
         }

         const { name, email, phone, password } = req.body;
         req.session.registerData = { name, email };

         const hashPassword = await bcrypt.hash(password, 12);
         const user = new User({
            name,
            email,
            phone,
            password: hashPassword,
         });

         await user.save();

         smtpTransport.sendMail(regEmail(email), (err, res) => {
            err ? console.log(err) : smtpTransport.close();
         });
         res.redirect("/profile");
      } catch (err) {
         console.log(err);
      }
   }
);

module.exports = router;
