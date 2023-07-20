const express = require('express');
const app = express();
const path = require('path');
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/bands', async (req, res) => {
  const bands = await Band.find({});
  res.render('bands/index', { bands });
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})