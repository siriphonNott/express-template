const express = require('express'),
      morgan = require('morgan'),
      cors = require('cors')
      passport = require("passport"),
      path = require('path'),
      databases = require('../configs/databases')

module.exports = async (app) => {
  
  // Connect MongoDB
  databases.mongoDB()

  // CORS
  app.use(cors())

  // Parser Body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Logger
  app.use(morgan('dev'))

  // Passport
  require('../configs/passport');

  // Static file
  app.use('/static', express.static(path.join(__dirname, '../public')))

  // Custom Response Format
  app.use(require('../configs/responseFormat'))
  
}