const router = require('express').Router()
const controllers = require('../../controllers/user.controller')
const auth = require('../auth')
const validator = require('../../validators')

router.get('/', auth.required, controllers.onGetAll)
router.get('/:id', auth.required, controllers.onGetById)
router.post('/', auth.required, controllers.onInsert)
router.put('/:id', auth.required, controllers.onUpdate)
router.delete('/:id', auth.required, controllers.onDelete)
router.post('/login', controllers.onLogin)
router.post('/register', controllers.onRegister)
router.post('/refresh-token', controllers.onRefreshToken)

module.exports = router
