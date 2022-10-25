// routes/auth.routes.js
module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  var router = require("express").Router();

  // register/ signup
  router.post("/signup", auth.signup);

  // login
  router.post("/login", auth.login);


  app.use("/api/auth", router);
};
