const express = require('express')
const app = express()
const port = process.env.PORT || 3000; 
const router = require('./routes')
app.use(cors()); //memfilter akses. jika dalam kurung kosong, semua bisa masuk
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})