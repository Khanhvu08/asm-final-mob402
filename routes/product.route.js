const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controllers");
const middleware=require('../middleware/middleware');
const upload =require('../Utils/upload')

router.get("/",middleware.reqAuthenticated,middleware.verifyToken, controller.renderProduct);

router.get('/result',middleware.reqAuthenticated,controller.renderSearch)
router.post('/addProduct',middleware.reqAuthenticated,upload.single("imgProduct"),controller.renderAddProduct)   
router.post("/updateProduct",middleware.reqAuthenticated,upload.single("imgProduct"),controller.renderUpdateProduct);
router.post("/deleteProduct",middleware.reqAuthenticated,controller.deleteProduct);

module.exports = router;
