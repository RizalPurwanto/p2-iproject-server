require('dotenv').config({path:'../.env'})
const axios = require('axios')
const { application } = require('express')
const API_KEY = process.env.RESTDB_API_KEY
console.log(API_KEY)


let data = {
    "to":"pholiodrei@gmail.com",
    "subject":"Cogratulations, you are Verified", 
    "html": "<p>Lorem ipsum dolor..., <b>vel</b> luctu.</p>", 
    "company": "KYC Inc", 
    "sendername": "KYC customer support"
}
let headers = {
    "Content-Type": "application/json",
"x-apikey": `44c7819fefcd4732e259952c1a91b516f6424`,
"Cache-Control": "no-cache"
}
let mail = axios.post(`https://testdatabase-61b1.restdb.io/mail`, data, {
    headers: headers
})
.then((response) => {
   console.log(response.data, "INI RESPONSE")
  })
  .catch((error) => {
    console.log(error)
  })
