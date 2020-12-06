const User = require('../models/User'),
  config = require('../configs/app'),
  jwt = require('jsonwebtoken'),
  { ErrorBadRequest, ErrorNotFound, ErrorUnauthorized } = require('../configs/errorMethods')

const methods = {
  scopeSearch(req) {
    $or = []
    if (req.query.username) $or.push({ username: { $regex: req.query.username } })
    if (req.query.email) $or.push({ email: { $regex: req.query.email } })
    if (req.query.age) $or.push({ age: +req.query.age })
    const query = $or.length > 0 ? { $or } : {}
    const sort = { createdAt: -1 }
    if (req.query.orderByField && req.query.orderBy)
      sort[req.query.orderByField] = req.query.orderBy.toLowerCase() == 'desc' ? -1 : 1
    return { query: query, sort: sort }
  },

  find(req) {
    const limit = +(req.query.size || config.pageLimit)
    const offset = +(limit * ((req.query.page || 1) - 1))
    const _q = methods.scopeSearch(req)

    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([User.find(_q.query).sort(_q.sort).limit(limit).skip(offset), User.countDocuments(_q.query)])
          .then((result) => {
            const rows = result[0],
              count = result[1]
            resolve({
              total: count,
              lastPage: Math.ceil(count / limit),
              currPage: +req.query.page || 1,
              rows: rows,
            })
          })
          .catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },

  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await User.findById(id)
        if (!obj) reject(ErrorNotFound('id: not found'))
        resolve(obj.toJSON())
      } catch (error) {
        reject(ErrorNotFound('id: not found'))
      }
    })
  },

  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = new User(data)
        const inserted = await obj.save()
        resolve(inserted)
      } catch (error) {
        reject(ErrorBadRequest(error.message))
      }
    })
  },

  update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await User.findById(id)
        if (!obj) reject(ErrorNotFound('id: not found'))
        await User.updateOne({ _id: id }, data)
        resolve(Object.assign(obj, data))
      } catch (error) {
        reject(error)
      }
    })
  },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await User.findById(id)
        if (!obj) reject(ErrorNotFound('id: not found'))
        await User.deleteOne({ _id: id })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await User.findOne({ username: data.username })
        if (!obj) {
          reject(ErrorUnauthorized('username not found'))
        }

        if (!obj.validPassword(data.password)) {
          reject(ErrorUnauthorized('password is invalid.'))
        }

        resolve({ accessToken: obj.generateJWT(obj), userData: obj })
      } catch (error) {
        reject(error)
      }
    })
  },

  refreshToken(accessToken) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(accessToken)
        const obj = await User.findOne({ username: decoded.username })
        if (!obj) {
          reject(ErrorUnauthorized('username not found'))
        }
        resolve({ accessToken: obj.generateJWT(obj), userData: obj })
      } catch (error) {
        reject(error)
      }
    })
  },
}

module.exports = { ...methods }
