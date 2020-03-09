module.exports = (req, res,  next) => {
  
  res.success = (data = '', statusCode = 200) => {
    res.status(statusCode || 200).send(data)
  }

  res.error = (errorMsg = '', statusCode = 500) => {
    res.status(statusCode || 500).send({error: {status: statusCode, message: errorMsg}})
  }

  next();
}