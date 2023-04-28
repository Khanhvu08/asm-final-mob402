const myModel = require("../../models/Product");

exports.listProducts = async (req, res, next) => {
  try {
    let listPrd = await myModel.find();
    if (listPrd) {
      return res.status(200).json({ list_Products: listPrd });
    } else {
      return res.status(204).json({ msg: "Không có dữ liệu" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
