require('dotenv').config({path:'../.env'})
const mailgun = require("mailgun-js");
const API_KEY = process.env.MAILGUN_API_KEY
console.log(API_KEY, "INI API KEY MAILGUN")

const DOMAIN = "sandboxbb09fbc9a8f34d1ca45d4def812e72cb.mailgun.org";
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandboxbb09fbc9a8f34d1ca45d4def812e72cb.mailgun.org>",
	to: "pholiodrei@gmail.com",
	subject: "Hello",
	template: "verification_notice",
	'h:X-Mailgun-Variables': {test: "test"}
};
// mg.messages().send(data, function (error, body) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(body, "BODY");
//     }
	
// });

module.exports = {
    mg
}