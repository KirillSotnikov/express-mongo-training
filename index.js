const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')

const User = require('./models/user')

const app = express()
const path = require('path')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try{
    const user = await User.findById('5def6ebb1a818117c823cd1a')
    req.user = user
    next()
  } catch(err) {
    console.log(err)
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = 'mongodb+srv://sotnikov_k:OP1imCvCqLmcrQri@mongovue-voe6y.mongodb.net/trainingVladilen?retryWrites=true&w=majority'
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true
    })
    const candidate = await User.findOne()
    if(!candidate){
      const user = new User({
        email: 'sotnikov_k@outlook.com',
        name: 'Kirill',
        cart: { items: [] }
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
