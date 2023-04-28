const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controllers");
const middleware = require('../middleware/middleware')
router.get("/",middleware.isAuthenticated, controller.renderLogin);
router.post("/", controller.renderLogin);

router.get("/register",middleware.isAuthenticated, controller.renderRegister);
router.post("/register", controller.renderRegister);

router.get('/logout',middleware.reqAuthenticated,controller.renderLogout)


module.exports = router;
