const keys = require('../keys/index')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
   keys.EMAIL_CLIENT_ID, // Client ID
   keys.EMAIL_CLIENT_SECRET, // Client Secret
   'https://developers.google.com/oauthplayground' // URL - адрес перенаправления
)

oauth2Client.setCredentials({
   refresh_token: keys.EMAIL_REFRESH_TOKEN,
})
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
   service: 'gmail',
   tls: {
      rejectUnauthorized: false,
   },
   auth: {
      type: 'OAuth2',
      user: keys.EMAIL_USER,
      clientId: keys.EMAIL_CLIENT_ID,
      clientSecret: keys.EMAIL_CLIENT_SECRET,
      refreshToken: keys.EMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
   },
})

module.exports = smtpTransport
