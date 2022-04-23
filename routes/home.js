/* создание объекта роутера */
const { Router } = require('express')
const router = Router()


/* обработака http-запросов */
router.get('/', (req, res) => {
    const user = req.session.user
    res.render('index', {
        title: 'cheesBook',
        user,
    })
})


/* экспорт модуля */
module.exports = router