const Service = require('../services/user.service')

const methods = {
  async onGetAll(req, res) {
    try {
      let result = await Service.find(req)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },

  async onGetById(req, res) {
    try {
      let result = await Service.findById(req.params.id)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },

  async onInsert(req, res) {
    try {
      let result = await Service.insert(req.body)
      res.success(result, 201)
    } catch (error) {
      res.error(error)
    }
  },

  async onUpdate(req, res) {
    try {
      const result = await Service.update(req.params.id, req.body)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },

  async onDelete(req, res) {
    try {
      await Service.delete(req.params.id)
      res.success('success', 204)
    } catch (error) {
      res.error(error)
    }
  },

  async onLogin(req, res) {
    try {
      let result = await Service.login(req.body)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },

  async onRegister(req, res) {
    try {
      let result = await Service.insert(req.body)
      res.success(result, 201)
    } catch (error) {
      res.error(error)
    }
  },

  async onRefreshToken(req, res) {
    try {
      let result = await Service.refreshToken(req.body.accessToken)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },
}

module.exports = { ...methods }
