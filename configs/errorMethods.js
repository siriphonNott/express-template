module.exports = {
  ErrorNotFound(msg) {
    return error
  },
  ErrorNotModified(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 304
    return error
  },
  ErrorBadRequest(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 400
    return error
  },
  ErrorUnauthorized(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 401
    return error
  },
  ErrorPaymentRequired(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 402
    return error
  },
  ErrorForbidden(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 403
    return error
  },
  ErrorNotFound(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 404
    return error
  },
  ErrorMethodNotAllowed(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 405
    return error
  },
  ErrorUnprocessableEntity(msg) {
    let error = new Error(msg)
    error.message = msg
    error.status = 422
    return error
  },
}
