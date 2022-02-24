const express = require("express");
const router = express.Router();


const verification = require("./verification");
const register = require("./register")
//router.use("/", authRouter);
router.use("/verify", verification)
router.use("/register", register)

module.exports = router;