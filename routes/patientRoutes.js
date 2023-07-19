const express = require("express");

const {
  registerController,
  loginController,
} = require("../controllers/patientCtrl");

const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

module.exports = router;
