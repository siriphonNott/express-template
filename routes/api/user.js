const router = require('express').Router()
const controllers = require('../../controllers/user.controller')
const auth = require('../auth')
const validator = require('../../validators')

router.get('/xx', [validator.user.get, validator.check],  controllers.onGetAll)
router.get('/', [validator.user.get, validator.check], auth.required, controllers.onGetAll)
router.get('/:id', auth.required, controllers.onGetById)
router.post('/', auth.required, controllers.onInsert)
router.put('/:id', auth.required, controllers.onUpdate)
router.delete('/:id', auth.required, controllers.onDelete)
router.post('/login', controllers.onLogin)
router.post('/register', controllers.onRegister)
router.post('/refresh-token',  controllers.onRefreshToken)

module.exports = router