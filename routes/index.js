const express = require("express");
const router = express.Router();


const verification = require("./verification");
const driverLicence = require("./driverLicence")
//router.use("/", authRouter);
router.use("/verify", verification)


module.exports = router;