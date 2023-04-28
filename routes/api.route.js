const express = require('express');
const router = express.Router();
const controller = require('../controllers/api/user.api')
const middleware = require('../middleware/middleware')
const ctrlUser = require('../controllers/user.controllers')
/* GET users listing. */
router.get('/products',controller.listProducts);
router.post('/products',middleware.checkAuth,controller.listProducts);
router.post('/v1/register',ctrlUser.renderRegister);
module.exports = router;
