require('dotenv').config({ path: '../.env' })
const axios = require('axios')

const API_KEY = process.env.RESTDB_API_KEY
console.log(API_KEY)
const BASE_URL = `https://testdatabase-61b1.restdb.io/mail`

// let data = {
//     "to":"pholiodrei@gmail.com",
//     "subject":"Cogratulations, you are Verified", 
//     "html": "<p>Lorem ipsum dolor..., <b>vel</b> luctu.</p>", 
//     "company": "KYC Inc", 
//     "sendername": "KYC customer support"
// }
// const headers = {
//     "Content-Type": "application/json",
// "x-apikey": `${API_KEY}`,
// "Cache-Control": "no-cache"
// }
// let mail = axios.post(`https://testdatabase-61b1.restdb.io/mail`, data, {
//     headers: {
//          "Content-Type": "application/json",
// "x-apikey": `${API_KEY}`,
// "Cache-Control": "no-cache"
//     }
// })
// .then((response) => {
//    console.log(response.data, "INI RESPONSE")
//   })
//   .catch((error) => {
//     console.log(error)
//   })

const instance = axios.create({
    baseUrl: ``, 
    
    headers: {
        "Content-Type": "application/json",
        "x-apikey": `${API_KEY}`,
        "Cache-Control": "no-cache"
    }
})

module.exports = instance
