exports.renderInvoice = async (req, res) => {
  const myInvoiceModel = require("../models/invoice");
  try {
    let allInvoices = await myInvoiceModel
      .find({})
      .populate("username", "fullName")
      .populate("userEmail", "email")
      .populate("productName", "productName")
      .populate("productPrice", "productPrice")
      .lean();
    res.render("home/admin/invoice", { data: allInvoices, name: "Invoices" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
