const { body, sanitizeBody } = require("express-validator");
const User = require("../models/user");

module.exports = {
   registerValidators: [
      body("email")
         .isEmail()
         .withMessage("Введите корректный email")
         .custom(async (value, { req }) => {
            try {
               const candidate = await User.findOne({ email: value });
               if (candidate) {
                  return Promise.reject(
                     "Пользователь с таким email уже существует"
                  );
               }
            } catch (e) {
               console.log(e);
            }
         })
         .normalizeEmail()
         .escape(),
      body(
         "password",
         "Пароль должен быть длиной от 6 до 56 символов, содержать буквы латинского алфавита и цифры"
      )
         .isLength({ min: 6, max: 56 })
         .trim()
         .escape(),
      body("confirm", "Пароли не совпадают").custom((value, {req})=>{
         return value === req.body.password
      }).trim(),
      body("name", "Введите имя").isLength({ min: 1 }).trim().escape(),
      body("phone", "Введите корректный номер телефона").isMobilePhone(),
   ],
   loginValidators: [
      body("email")
         .isEmail()
         .normalizeEmail()
         .custom(async (value, { req }) => {
            try {
               const candidate = await User.findOne({ email: req.body.email });
               if (!candidate) {
                  return Promise.reject(
                     "Пользователя с таким email не существует"
                  );
               }
            } catch (e) {
               console.log(e);
            }
         }),
      body("password").trim(),
   ],
   bookValidators: [
      body("title").escape().trim(),
      body("author").escape().trim(),
      body("genre").escape().trim(),
      body("year", "Некорректное число").escape().isNumeric(),
      body("publisher").escape().trim(),
      body("about").escape(),
      body("inAvailable").isNumeric().escape(),
   ],
   searchValidators: [
     body("title").escape().trim(),
   ],
   profileValidators: [
      body("name").escape().trim(),
   ],
   /*   resetEmailValidators: [
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom(async (value, { req }) => {
        try {
          const candidate = await User.findOne({ email: req.body.email });
          if (!candidate) {
            return Promise.reject("Пользователя с таким email не существует");
          }
        } catch (e) {
          console.log(e);
        }
      }),
  ],
  resetPasswordValidators: [
   body('password')
      .trim()
      .isLength({min: 6, max: 56})
      .isAlphanumeric(),
    body("confirm", 'Пароли не совпадают')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Пароли не совпадают')
        }
        return true
    })
      .trim(),
  ], */
};
