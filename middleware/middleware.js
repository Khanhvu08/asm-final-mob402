const jwt = require("jsonwebtoken");
const myModel = require("../models/Product");
const UserModel = require("../models/User");
const myInvoiceModel = require("../models/Invoice");

exports.verifyToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }
    const admin = decoded.admin;
    if (admin) {
      let objProducts = await myModel.find();
      return res.render("home/admin/index", {
        data: objProducts,
        name: "Products",
      });
    } else {
      res.redirect("/users");
    }
  });
};

exports.reqAuthenticated = (req, res, next) => {
  if (req.session.userLogin) {
    return next();
  } else {
    return res.redirect("/");
  }
};
exports.isAuthenticated = (req, res, next) => {
  if (req.session.isLogin) {
    res.redirect("/products");
  } else {
    next();
  }
};

exports.checkAuth = async (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect("/");
  } else {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, decoded) => {
      if (err) {
        return res.redirect("/");
      }
      const admin = decoded.admin;
      if (admin) {
        next();
      } else {
        res.status(403).json("You dont have permission to access this");
      }
    });
  }
};

exports.checkToken = async (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect("/login");
  } else {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, decoded) => {
      if (err) {
        return res.redirect("/login");
      }
      const admin = decoded.admin;
      const id = decoded.id;
      if (admin || id == req.body._id) {
        next();
      } else {
        const userInfor = await UserModel.find({ _id: id });
        res.render("home/user/index", { data: userInfor });
      }
    });
  }
};
exports.checkTokenInvoice = async (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect("/login");
  } else {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, decoded) => {
      if (err) {
        return res.redirect("/login");
      }
      const admin = decoded.admin;
      const id = decoded.id;
      if (admin) {
        next();
      } else {
        const allInvoice = await myInvoiceModel
          .find({ username: id })
          .populate("username", "fullName")
          .populate("userEmail", "email")
          .populate("productName", "productName")
          .populate("productPrice", "productPrice")
          .lean();
        res.render("home/user/invoice", { data: allInvoice, name: "Invoices" });
      }
    });
  }
};
