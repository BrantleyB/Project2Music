const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title:String,
    artist:String,
    genre:String,
    year: Number,
    price: Number,
    quantity: Number,
    img: String
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
