const router = require("express").Router();
const middleware = require("../middleware/middleware");
const controller = require("../controllers/invoice.controller");
router.get("/", middleware.reqAuthenticated,middleware.checkTokenInvoice,controller.renderInvoice);

module.exports = router;
