/*
 * - подключения основных модулей
 * - создание сервера
 * - движок рендеринга и роуты
 * - session
 * - свои middleawars
 * - запуск сервера
 */

// основные модули =====================================================================================================================================================================================================
const path = require("path"); //для работы с путями к папкам
const keys = require("./keys"); //файл с секретными переменными
const express = require("express"); //для ускорения разработки
const exphbs = require("express-handlebars"); //для frontend
const mongoose = require("mongoose"); //для взаимодействя с mongoDB
const session = require("express-session"); //для работы с сессиями
const flash = require('connect-flash')
const varMiddleware = require("./middlewares/variables"); //свой middleware. добавляет параметры к ответу сервера
const fileMiddleware = require('./middlewares/file')

// создание сервера =====================================================================================================================================================================================================
const app = express();

// Handlebars, устранение ошибок =====================================================================================================================================================================================================
// устранение ошибки взаимодествия mongoose и Handlebars
const Handlebars = require("handlebars");
const {
   allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// настройка парсера URL-encoded (решает проблему пустого req.body при post запрсах)
app.use(express.urlencoded({ extended: true })); // когда "extended: true" парсинг URL-encoded data проходит с помощью библиотеки qs (вместо querystring)

// создание и настройка оъекта handlebars
const hbs = exphbs.create({
   defaultLayout: "main",
   extname: "hbs",
   handlebars: allowInsecurePrototypeAccess(Handlebars), //для устранения ошибки при взаимодействии Handlebars и mongoos
   helpers: require('./utils/hbs-helpers'),
});

// внедрение handlebars в app
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

// статические папки
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/profile", express.static(path.join(__dirname, "/images")));
app.use(express.static(path.join(__dirname, "public"))); //задаёт 'public' как статическую папку для обращения через "/"

// Session =====================================================================================================================================================================================================
const MongoStore = require('connect-mongodb-session')(session)
const store = new MongoStore({
   collection: 'sessions',
   uri: keys.MONGODB_URI,
})

// настройка конфигурации сессии
app.use(
   session({
      secret: "Str12-01Rt",
      resave: false,
      saveUninitialized: false,
      store
   })
);



// Middlewares =====================================================================================================================================================================================================
app.use(varMiddleware);
app.use('/profile', fileMiddleware.single('avatar'));
app.use('/add', fileMiddleware.single('preview'));
app.use(flash())

// routes =====================================================================================================================================================================================================
// регистрация роутов
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const addRoutes = require("./routes/add");
const booksRoutes = require("./routes/books");
const genresRoutes = require("./routes/genres");

// подключение обработчиков GET-запросов
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/add", addRoutes);
app.use("/profile", profileRoutes);
app.use("/books", booksRoutes);
app.use("/genres", genresRoutes);

// Запуск сервера =====================================================================================================================================================================================================
// определение порта
const PORT = process.env.PORT || 3000;

// запуск сервера
async function start() {
   try {
      await mongoose.connect(
         keys.MONGODB_URI,
         {
            useNewUrlParser: true,
         }
      );
      // запуск сервера
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (err) {
      console.log(err);
   }
}

start();
