const {Schema, model} = require('mongoose')
const bookSchema = new Schema({
   title: {
       type: String,
       required: true,
   },
   author: {
    type: String,
    required: true,
},
genre: {
    type: String,
    required: true,
},
about: {
    type: String,
    required: true,
},
year: {
    type: Number,
    required: true,
},
publisher: {
    type: String,
    required: true,
},
isAvailable: {
    type: Number,
    required: true,
},
previewUrl: {
    type: String,
},
url: {
    type: String,
}
})

module.exports = model('Book', bookSchema)