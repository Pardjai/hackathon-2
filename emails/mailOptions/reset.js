const keys = require('../../keys')

module.exports = function (email, token) {
   return {
      from: keys.EMAIL_FROM,
      to: email,
      subject: 'Восстановление доступа',
      html: `
         <h1>Восстановление доступа</h1>
         <p>Если вы не запрашивали сброс пароля, то просто проигнорируйте это письмо</p>
         <p>Если это были вы, перейдите по ссылке: </p>
         <p><a href="${keys.BASE_URL}/auth/password/${token}">Сбросить пароль</a></p>
         <hr/>
         <p><a href="${keys.BASE_URL}">Магазин курсов</a></p>
      `,
   }
}
