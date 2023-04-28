const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const indexRouter = require("./routes/index.route");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const apiRouter = require("./routes/api.route");
const invoiceRouter = require("./routes/invoice.route");
const { default: mongoose } = require("mongoose");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname) + "/public"));

app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/invoices", invoiceRouter);
app.use("/api", apiRouter);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongoose is connected"))
  .catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.originalUrl.indexOf("/api") == 0) {
    res.json({
      status: 0,
      msg: err.message,
    });
  } else {
    res.render("error");
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
