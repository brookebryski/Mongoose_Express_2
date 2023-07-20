const mongoose = require('mongoose');
const Band = require('./models/band');

mongoose.connect('mongodb://127.0.0.1:27017/musicApp', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection open!")
})
.catch(err => {
    console.log("there was a Mongo connection error:")
    console.log(err)
})

const seedBands = [
    {
        name: 'Oh Wonder',
        rating: 5,
        genre: 'alt pop'
    },
    {
        name: 'Beach House',
        rating: 5,
        genre: 'indie'
    },
    {
        name: 'Miley Cyrus',
        rating: 4,
        genre: 'pop'
    },
    {
        name: 'Courtney Marie Andrews',
        rating: 3,
        genre: 'country'
    },
    {
        name: 'Mac Miller',
        rating: 5,
        genre: 'rap'
    }
]

Band.insertMany(seedBands)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})