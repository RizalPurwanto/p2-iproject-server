const axios = require('axios')

const instance = axios.create({
    baseURL: "https://test-au.vixverify.com/Registrations-Registrations/DynamicFormsServiceV3",
    
    headers:
        {
        'Content-Type': 'text/xml'
    }
    
})
module.exports = instance