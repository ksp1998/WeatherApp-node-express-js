const express = require('express')
const path = require('path')
const chalk = require('chalk')
const hbs = require('hbs')

const PORT_NUMBER = process.env.PORT || 8000

const app = express();

const static_path = path.join(__dirname, './public')
const views_path = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')

app.set("view engine", "hbs")
app.use(express.static(static_path))
app.set("views", views_path)
hbs.registerPartials(partials_path)

// Routing
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/home', (req, res) => {
    res.redirect('/#home')
})

app.get('/weather', (req, res) => {
    res.redirect('/#weather')
})

app.get('/about', (req, res) => {
    res.redirect('/#about')
})

app.get('*', (req, res) => {
    res.render("404error", {url: req.url});
})

app.listen(PORT_NUMBER, () => {
    console.log(chalk.yellow.inverse(`Listening at port ${PORT_NUMBER}`))
})