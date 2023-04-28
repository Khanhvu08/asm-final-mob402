const bcrypt = require("bcrypt"); //thu vien ma hoa password
const myModel = require("../models/User");
const jwt = require("jsonwebtoken");
exports.renderLogin = async (req, res) => {
  const { usr, pwd } = req.body;
  if (req.method === "POST") {
    try {
      const user = await myModel.findOne({ email: usr }).maxTimeMS(20000);
      if (user) {
        const isMatch = await bcrypt.compare(pwd, user.password);
        if (isMatch) {
          req.session.userLogin = user;
          req.session.isLogin = true;
          const token = jwt.sign(
            { id: user._id, admin: user.isAdmin },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30m" }
          );
          req.session.token = token;
          return res.redirect("/products");
        } else {
          return res.redirect("/?login=false");
        }
      } else {
        return res.redirect("/?login=null");
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.render("login", { login: req.query.login });
};
exports.renderRegister = async (req, res) => {
  if (req.method === "POST") {
    const { username, password, fullName } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const pwd = await bcrypt.hash(password, salt);
      const user = new myModel({
        email: username,
        password: pwd,
        fullName,
      });
      await user.save();
      return res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  res.render("register");
};

exports.renderLogout = (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      // Redirect the user to the login page
      console.log("thanh cong");
      res.redirect("/");
    }
  });
};

exports.renderUser = async (req, res) => {
  const objUsers = await myModel.find();
  res.render("home/admin/user", {
    name: "Users",
    data: objUsers,
  });
};

exports.renderAddUser = async (req, res) => {
  try {
    const { email, userPassword, username } = req.body;
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(userPassword, salt);
    const user = new myModel({
      email,
      password: pwd,
      fullName: username,
    });
    await user.save();
    res.redirect("/users");
  } catch (err) {
    console.log(err);
  }
};

exports.renderUpdateUser = async (req, res) => {
  try {
    const { _id, updateName, updateEmail, UNewPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(UNewPassword, salt);
    console.log(_id);
    const user = {
      email: updateEmail,
      fullName: updateName,
      password: pwd,
    };
    await myModel.findByIdAndUpdate(_id, user);
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
};
exports.renderDeleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    await myModel.findByIdAndDelete(_id.trim());
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
};




exports.renderSearch = async (req, res) => {
  const { search_query } = req.query;
  try {
    let arrUser = await myModel.find({
      email: { $regex: search_query, $options: "i" },
    });
    res.render("home/search", {name: "Users", data: arrUser,check:1 });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};