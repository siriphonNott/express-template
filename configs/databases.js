const mongoose = require('mongoose')
const config = require('../configs/app')


const databases = {

  mongoDB(){
    const db = mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true}, error => {
      if (error)  console.error('MongoDB error: ', error)
      console.log("MongoDB connected")
    });
    return db;
  },

  mysql(){},

  postgresql(){},

  mssql(){}

}

module.exports = { ...databases }