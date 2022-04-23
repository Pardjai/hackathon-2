const { Schema, model } = require('mongoose')

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   birthday: {
      type: Date,
   },
   email: {
      type: String,
      required: true,
   },
   phone: {
      type: Number,
      required: true,
   },
   avatarUrl: {
      type: String,
   },
   isLibrarian: {
      type: Boolean,
   },
   password: {
      type: String,
      required: true,
   },
})

module.exports = model('User', userSchema)
