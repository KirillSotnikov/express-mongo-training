const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')

const app = express()
const path = require('path')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = 'mongodb+srv://sotnikov_k:OP1imCvCqLmcrQri@mongovue-voe6y.mongodb.net/trainingVladilen?retryWrites=true&w=majority'
    await mongoose.connect(url, {useNewUrlParser: true})
    app.listen(3000, () => {
      console.log(`Server is running ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
