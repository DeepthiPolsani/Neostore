const router = require('express').Router()
const userCtrl = require('../controllers/userControllers')
const auth = require('../middleware/auth');



router.post('/register', userCtrl.register)
router.post('/login',userCtrl.login)



module.exports = router