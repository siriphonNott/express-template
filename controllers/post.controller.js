const Service = require('../services/post.service')
// validate module

const methods = {

  async onGetAll(req, res){
    try {
      let result = await Service.find(req)
      res.success(result);
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  async onGetById(req, res){
    try {
      let result = await Service.findById(req.params.id)
      res.success(result);
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  async onInsert(req, res){
    try {
      let result = await Service.insert(req.body)
      res.success(result, 201);
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  async onUpdate(req, res){
    try {
      await Service.update(req.params.id, req.body)
      res.success('success');
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  async onDelete(req, res){
    try {
      await Service.delete(req.params.id)
      res.success('success', 204);
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  async onLogin(req, res){
    try {
      let result =  await Service.login(req.body)
      res.success(result);
    } catch (error) {
      res.error(error.message, error.status)
    }
  },

  onRegister(req, res){
    res.success({page: 'login'})
  }

} 

module.exports = { ...methods }