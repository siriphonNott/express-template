const Post = require('../models/Post')
const config = require('../configs/app')

const methods = {

  scopeSearch(req) {
    $or = []
    if(req.query.title) $or.push({ title: { $regex: req.query.title } })
    if(req.query.description) $or.push({ description: { $regex: req.query.description } })
    let query = $or.length > 0 ? { $or } : {}
    let sort = { createdAt: -1 }
    if(req.query.orderByField && req.query.orderBy)
      sort = { [req.query.orderByField]: req.query.orderBy.toLowerCase() == 'desc' ? -1 : 1 }
    return { query: query, sort: sort }
  },

  find(req) {
    let limit = +(req.query.size || config.pageLimit);
    let offset = +(limit*((req.query.page || 1) -1));
    let _q  = methods.scopeSearch(req)
    
    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          Post.find(_q.query).sort(_q.sort).limit(limit).skip(offset).populate('author'),
          Post.countDocuments(_q.query)
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
        let obj = await Post.findById(id).populate('author')
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
        const obj = new Post(data)
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
        let obj = await Post.findById(id)
        if(!obj) reject(methods.error('Data Not Found', 404))
        await Post.updateOne({_id: id}, data)
        resolve()
      } catch (error) {
        reject(error)
      }
    });
  },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let obj = await Post.findById(id)
        if(!obj) reject(methods.error('Data Not Found', 404))
        await Post.deleteOne({_id: id})
        resolve()
      } catch (error) {
        reject(error)
      }
    });
  },

  error(msg, status = 500) {
    let error = new Error(msg)
    error.status = status
    return error;
  }

} 

module.exports = { ...methods }