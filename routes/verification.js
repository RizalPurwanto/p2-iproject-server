const Controller = require ('../controllers/verifyController')
const express = require("express")
const router = express.Router()

router.post ('/register', Controller.registerCustomer)//daftarkan customer baru
 router.get('/sources', Controller.getSources)//semua status data satu customer
 router.get('/sources/:sourceId', Controller.getFields)//arahkan ke form berdasarkan id
 
 router.post('/aec', Controller.setFieldsAec)//arahkan ke form berdasarkan
 router.post('/dnb', Controller.setFieldsDnb)//arahkan ke form berdasarkan 
 router.post('/visa', Controller.setFieldsVisa)//arahkan ke form berdasarkan 
 router.post('/driverlicence/:sourceId', Controller.setFieldsDriverLicence)//post ke API berdasarkan body dari form

module.exports = router