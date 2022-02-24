const Controller = require ('../controllers/verifyController')
const express = require("express")
const router = express.Router()

router.post ('/', Controller.registerCustomer)//daftarkan customer baru


module.exports = router