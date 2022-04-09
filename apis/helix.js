const axios = require('axios')

const instance = axios.create({
    baseURL: "https://kangarooservice-dev.au.auth0.com/oauth/token",
    
    headers:
        {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br'
    }
    
})
module.exports = instance