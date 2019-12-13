const User = require('../models/User')
const config = require('../configs/app')

const methods = {

  scopeSearch(req) {
    $or = []
    if(req.query.username) $or.push({ username: { $regex: req.query.username } })
    if(req.query.email) $or.push({ email: { $regex: req.query.email } })
    if(req.query.age) $or.push({ age: +req.query.age })
    let query = $or.length > 0 ? { $or } : {}
    let sort = { createdAt: -1 }
    if(req.query.orderByField && req.query.orderBy)
      sort = { [req.query.orderByField]: req.query.orderBy.toLowerCase() == 'desc' ? -1 : 1 }
    return { query: query, sort: sort }
  },

  find(req) {
    let limit   = +(req.query.size || config.pageLimit);
    let offset  = +(limit*((req.query.page || 1) -1));
    let _q   = methods.scopeSearch(req)
    
    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          User.find(_q.query).sort(_q.sort).limit(limit).skip(offset),
          User.countDocuments(_q.query)
        ]).then((result)=>{
          let rows = result[0]
          let count = result[1]
          resolve({
            rows: rows,
            total: count,
            lastPage: Math.ceil(count/limit),
            currPage: +req.query.page || 1
          })
        }).catch((error)=>{
          reject(error)
        })
      } catch (error) {
        reject(error)
      }
    });
  },

  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let obj = await User.findById(id)
        if(!obj) reject(methods.error('Data Not Found', 404))
        resolve(obj.toJSON())
      } catch (error) {
        reject(error)
      }
    });
  },

  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = new User(data)
        let inserted = await obj.save()
        resolve(inserted)
      } catch (error) {
        reject(methods.error(error.message, 400))
      }
    });
  },

  update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let obj = await User.findById(id)
        if(!obj) reject(methods.error('Data Not Found', 404))
        await User.updateOne({_id: id}, data)
        resolve()
      } catch (error) {
        reject(error)
      }
    });
  },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let obj = await User.findById(id)
        if(!obj) reject(methods.error('Data Not Found', 404))
        await User.deleteOne({_id: id})
        resolve()
      } catch (error) {
        reject(error)
      }
    });
  },

  login(data) {
    return new Promise(async (resolve, reject)=>{
      try {
        let obj = await User.findOne({username: data.username});
        if(obj.length < 1) {
          reject(methods.error('username not found', 401))
        }
        
        if(!obj.validPassword(data.password)) {
          reject(methods.error('password is invalid.', 401))
        }
        
        resolve({token: obj.generateJWT(obj)})
      } catch (error) {
        reject(error)
      }
    })
  },

  error(msg, status = 500){
    let error = new Error(msg)
    error.status = status
    return error;
  }

} 

module.exports = { ...methods }