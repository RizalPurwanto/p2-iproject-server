const express = require('express')
const app = express()
const port = process.env.PORT || 3000; 
const router = require('./routes')
const cors = require('cors')
console.log("INI CORS")

const errorHandler = require("./middlewares/errorHandler");
app.use(cors()); //memfilter akses. jika dalam kurung kosong, semua bisa masuk
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//test
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
      res.send(200);
  } else {
      next();
  }
});
app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})