const Controller = require ('../controllers/verifyController')
const express = require("express")
const router = express.Router()

router.post ('/register', Controller.registerCustomer)//daftarkan customer baru
 router.get('/sources', Controller.getSources)//semua status data satu customer
 router.get('/:sourceId', Controller.getFields)//arahkan ke form berdasarkan id
 
// router.post('/:sorceId', Controller.setFields)//post ke API berdasarkan body dari form

module.exports = router