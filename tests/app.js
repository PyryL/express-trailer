const express = require('express')
const trailer = require('../index')
const path = require('path')

const app = express()

trailer.get(app, '/', (req, res) => {
  res.json({
    page: 'index',
    url: req.originalUrl,
    urlparam: req.query,
  })
})

trailer.get(app, '/subpage', (req, res) => {
  res.json({
    page: 'subpage',
    url: req.originalUrl,
    urlparam: req.query,
  })
})

trailer.get(app, '/error', (req, res, next) => {
  next(new Error('oh no'))
})

trailer.get(app, '/.config', (req, res) => {
  res.json({
    page: 'config',
    url: req.originalUrl,
    urlparam: req.query,
  })
})

app.get('/image.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'logo.jpg'))
})

const myappRouter = express.Router()

trailer.get(myappRouter, '/', (req, res) => {
  res.json({
    page: 'myapp-index',
    url: req.originalUrl,
    urlparam: req.query,
  })
})

trailer.get(myappRouter, '/about', (req, res) => {
  res.json({
    page: 'myapp-about',
    url: req.originalUrl,
    urlparam: req.query,
  })
})

app.use('/myapp', myappRouter)

module.exports = app
