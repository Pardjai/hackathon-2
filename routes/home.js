/* создание объекта роутера */
const { Router } = require('express')
const router = Router()


/* обработака http-запросов */
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Страница',
        layout: 'home',
    })
})


/* экспорт модуля */
module.exports = router