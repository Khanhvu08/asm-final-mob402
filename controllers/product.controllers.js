const myModel = require("../models/Product");
const fs = require("fs");
exports.renderProduct = async (req, res) => {
  let objProducts = await myModel.find();
  res.render("home/admin/index", { data: objProducts, name: "Products" });
};

exports.renderSearch = async (req, res) => {
  const { search_query } = req.query;
  try {
    let arrProduct = await myModel.find({
      productName: { $regex: search_query, $options: "i" },
    });
    res.render("home/search", { name: "Products", data: arrProduct, check: 2 });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.renderUpdateProduct = async (req, res) => {
  const { id, productName, productPrice, colorUpdate, typeUpdate } = req.body;
  const file = req.file;
  const tempID = id.trim();
  console.log(tempID);
  console.log(req.file);
  if (!file) {
    const tempProduct = {
      productName,
      productPrice: Number(productPrice),
      productColor: colorUpdate,
      productType: typeUpdate,
    };
    await myModel.findByIdAndUpdate(tempID, tempProduct);
  } else {
    // Đọc file nội dung ảnh
    const imageData = fs.readFileSync(file.path);
    // Chuyển đổi ảnh sang base64
    const base64Image = imageData.toString("base64");
    //xac dinh loại tệp JPG,PNG,GÌF
    const mimeType = file.mimetype;
    const base64 = `data:${mimeType};base64,${base64Image}`;
    const tempProduct = {
      productName,
      productPrice: Number(productPrice),
      imgProduct: base64,
      productColor: colorUpdate,
      productType: typeUpdate,
    };
    await myModel.findByIdAndUpdate(tempID, tempProduct);
  }
  return res.redirect("/products");
};
exports.renderAddProduct = async (req, res) => {
  try {
    const { productName, productPrice, productColor, productType } = req.body;
    const file = req.file;
    let imgProduct =
      "https://cdn.vietnambiz.vn/2019/8/15/product-review-writing-services-15658537611611796432875.jpg";

    if (file) {
      const imageData = fs.readFileSync(file.path);
      const base64Image = imageData.toString("base64");
      const mimeType = file.mimetype;
      imgProduct = `data:${mimeType};base64,${base64Image}`;
    }
    const product = new myModel({
      productName,
      productPrice,
      imgProduct,
      productColor,
      productType,
    });
    await product.save();
    res.redirect("/products");
  } catch (error) {
    console.log("err: " + error);
  }
};
exports.deleteProduct = async (req, res, next) => {
  const idObj = req.body;
  await myModel.findByIdAndRemove(idObj.id.trim());
  res.redirect("/products");
};
