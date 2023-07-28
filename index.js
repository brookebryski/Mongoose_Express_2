const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/bands', async (req, res) => {
  const bands = await Band.find({});
  res.render('bands/index', { bands });
})

app.get('/bands/new', (req, res) => {
    res.render('bands/new')
})

app.get('/bands/:id', async (req, res) => {
    const { id } = req.params;
    const band = await Band.findById(id);
    res.render('bands/show', { band })
})

app.get('/bands/:id/edit', async (req, res) => {
    const { id } = req.params;
    const band = await Band.findById(id);
    res.render('bands/edit', { band })
})

app.put('/bands/:id', async (req, res) => {
    const { id } = req.params;
    const band = await Band.findByIdAndUpdate(id, req.body, { runValidators: true});
    res.redirect(`/bands/${band._id}`)
})

app.post('/bands'), async (req, res) => {
    const newBand = new Band(req.body);
    await newBand.save();
    res.redirect(`/bands/${newBand._id}`)
}

app.delete('/bands/:id', async (req, res) => {
    const { id } = req.params;
    const deletedBand = await Band.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})