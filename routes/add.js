const {Router} = require('express')
const router = Router()

const Course = require('../models/course')

router.get('/', (req, res) => {
  res.render('add', {pageTitle: 'Add courses page', isAdd: true})
})

router.post('/', async (req, res) => {
  try{
    let {name, price, url} = req.body
  
    const course = await new Course({
      name, 
      price, 
      url,
      userId: req.user
    })
  
    await course.save()
  
    res.redirect('/courses')
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router