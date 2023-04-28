const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controllers')
const middleware = require('../middleware/middleware')
/* GET users listing. */
router.get('/',middleware.reqAuthenticated,middleware.checkToken,controller.renderUser );
router.get('/result',middleware.reqAuthenticated,controller.renderSearch );
router.post('/addUsers',middleware.reqAuthenticated,controller.renderAddUser );
router.post('/updateUsers',middleware.reqAuthenticated,middleware.checkToken,controller.renderUpdateUser );

router.post('/deleteUsers',middleware.checkToken,controller.renderDeleteUser );
router.get('/logout',middleware.reqAuthenticated,controller.renderLogout)

module.exports = router;
