const express = require('express')
const app = express()
const port = process.env.PORT || 3000; 
const router = require('./routes')
const cors = require('cors')
const errorHandler = require("./middlewares/errorHandler");
app.use(cors()); //memfilter akses. jika dalam kurung kosong, semua bisa masuk
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//test
app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})