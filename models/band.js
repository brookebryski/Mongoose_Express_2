const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number, 
        required: true,
        min: 0,
        max: 5
    },
    genre: {
        type: String, 
        enum: ['indie', 'pop', 'country', 'rap', 'alt pop']
    }
})

const Band = mongoose.model('Band', bandSchema);

module.exports = Band;