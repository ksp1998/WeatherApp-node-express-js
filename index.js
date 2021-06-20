const express = require('express')
const path = require('path')
const chalk = require('chalk')
const hbs = require('hbs')

const PORT_NUMBER = process.env.PORT || 8000
const API_KEY = '284b84ec4a7e7f27748df72eb78ddbd2'

const app = express();

const static_path = path.join(__dirname, './public')
const template_path = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')

app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.use(express.static(static_path))

// Routing
app.get('/', (req, res) => {
    res.render("index")
})

app.get('*', (req, res) => {
    res.render("404error");
})

app.listen(PORT_NUMBER, () => {
    console.log(chalk.yellow.inverse(`Listening at port ${PORT_NUMBER}`))
})