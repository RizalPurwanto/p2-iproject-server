require("dotenv").config()
const axios = require('axios')
const convert = require('xml-js');
const parseString = require('xml2js').parseString;
const greenID = require("../apis/greenID")
const restDb = require('../apis/restDb')
const htmlEntities = require('html-entities');
const decode = require('html-entities-decoder')
const jsdom = require("jsdom");
const { JSDOM } = jsdom
const { Customer } = require('../models/index')
//require 2 full names, 1 DOB, and 2 addresses from 2 datasources
let accountId = process.env.GREEN_ID_ACCOUNT
let password = process.env.GREEN_ID_PASSWORD

const API_KEY = process.env.MAILGUN_API_KEY
console.log(API_KEY)



class Controller {

    static async setFieldsDriverLicence(req, res, next) {
        const { driverLicenceNumber, dob, surname, middleNames, givenName, tandc } = req.body
        const { verificationid } = req.headers
        const { sourceId } = req.params
        let xmlSetDriverLicence = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
<soapenv:Header/>
<soapenv:Body>
   <dyn:setFields>
      <accountId>${accountId}</accountId>
      <password>${password}</password>
      <verificationId>${verificationid}</verificationId>
      <sourceId>${sourceId}</sourceId>
      <inputFields>
         <input>
            <name>greenid_${sourceId}_number</name>
            <value>${driverLicenceNumber}</value>
         </input>
         <input>
            <name>greenid_${sourceId}_dob</name>
            <value>${dob}</value>
         </input>
         <input>
            <name>greenid_${sourceId}_surname</name>
            <value>${surname}</value>
         </input>
         <input>
            <name>greenid_${sourceId}_middlename</name>
            <value>${middleNames}</value>
         </input>
         <input>
            <name>greenid_${sourceId}_givenname</name>
            <value>${givenName}</value>
         </input>
         <input>
            <name>greenid_${sourceId}_tandc</name>
            <value>${tandc}</value>
         </input>
      </inputFields>
   </dyn:setFields>
</soapenv:Body>
</soapenv:Envelope>`


        try {
            let getFields = await greenID.post('', xmlSetDriverLicence)
            let parsedsetFields = JSON.parse(convert.xml2json(getFields.data, { compact: true, spaces: 4 }))

            res.status(200).json({
                result: parsedsetFields
            })
        } catch (err) {
            console.log(err)
            let error
            if (err) {
                if (Array.isArray(err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g))) {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g)[0].replace(/<\/?[^>]+(>|$)/g, "")
                } else {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g).replace(/<\/?[^>]+(>|$)/g, "")
                }

                res.status(500).json({ error: error, message: 'internal server error' })

                console.log(err.response.data)
            }



        }
    }

    static async setFieldsDnb(req, res, next) {
        const { tandc } = req.body
        const { verificationid } = req.headers
        const sourceId = 'dnb'
        let xmlSetDnb = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
<soapenv:Header/>
<soapenv:Body>
   <dyn:setFields>
      <accountId>${accountId}</accountId>
      <password>${password}</password>
      <verificationId>${verificationid}</verificationId>
      <sourceId>${sourceId}</sourceId>
      <inputFields>
         <input>
            <name>greenid_${sourceId}_tandc</name>
            <value>${tandc}</value>
         </input>
      </inputFields>
   </dyn:setFields>
</soapenv:Body>
</soapenv:Envelope>`


        try {
            let getFields = await greenID.post('', xmlSetDnb)
            let parsedsetFields = JSON.parse(convert.xml2json(getFields.data, { compact: true, spaces: 4 }))

            res.status(200).json({
                result: parsedsetFields
            })
        } catch (err) {
            console.log(err)
            let error
            if (err) {
                if (Array.isArray(err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g))) {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g)[0].replace(/<\/?[^>]+(>|$)/g, "")
                } else {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g).replace(/<\/?[^>]+(>|$)/g, "")
                }

                res.status(500).json({ error: error, message: 'internal server error' })

                console.log(err.response.data)
            }



        }
    }

    static async setFieldsAec(req, res, next) {
        const { surname, middleNames, givenName, streetName, streetNumber, streetType, suburb, state, postcode } = req.body
        const { verificationid } = req.headers

        let xmlSetAec = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
<soapenv:Header/>
<soapenv:Body>
   <dyn:setFields>
      <accountId>${accountId}</accountId>
      <password>${password}</password>
      <verificationId>${verificationid}</verificationId>
      <sourceId>aec</sourceId>
      <inputFields>
         
      <input>
      <name>greenid_aec_surname</name>
      <value>${surname}</value>
   </input>
   <input>
      <name>greenid_aec_givenname</name>
      <value>${givenName}</value>
   </input>
   <input>
      <name>greenid_aec_flatnumber</name>
      <value>${middleNames}</value>
   </input>
   <input>
      <name>greenid_aec_streetnumber</name>
      <value>${streetNumber}</value>
   </input>
   <input>
      <name>greenid_aec_streetname</name>
      <value>${streetName}</value>
   </input>
   <input>
      <name>greenid_aec_streettype</name>
      <value>${streetType}</value>
   </input>
   <input>
      <name>greenid_aec_suburb</name>
      <value>${suburb}</value>
   </input>
   <input>
      <name>greenid_aec_state</name>
      <value>${state}</value>
   </input>
   <input>
      <name>greenid_aec_postcode</name>
      <value>${postcode}</value>
   </input>
      </inputFields>
   </dyn:setFields>
</soapenv:Body>
</soapenv:Envelope>`


        try {
            let getFields = await greenID.post('', xmlSetAec)
            let parsedsetFields = JSON.parse(convert.xml2json(getFields.data, { compact: true, spaces: 4 }))

            res.status(200).json({
                result: parsedsetFields
            })
        } catch (err) {
            console.log(err)
            let error
            if (err) {
                if (Array.isArray(err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g))) {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g)[0].replace(/<\/?[^>]+(>|$)/g, "")
                } else {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g).replace(/<\/?[^>]+(>|$)/g, "")
                }

                res.status(500).json({ error: error, message: 'internal server error' })

                console.log(err.response.data)
            }



        }
    }

    static async setFieldsVisa(req, res, next) {
        const { visaNumber, surname, dob, country, tandc } = req.body
        const { verificationid } = req.headers
        console.log(req.headers, "INI VERIFICATION ID")
        console.log(req.body, "INI REQ BODY")

        let xmlSetVisa = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
<soapenv:Header/>
<soapenv:Body>
   <dyn:setFields>
      <accountId>${accountId}</accountId>
      <password>${password}</password>
      <verificationId>${verificationid}</verificationId>
      <sourceId>visa</sourceId>
      <inputFields>
         
      <input>
      <name>greenid_visa_number</name>
      <value>${visaNumber}</value>
   </input>
  <input>
      <name>greenid_visa_surname</name>
      <value>${surname}</value>
   </input>
   <input>
      <name>greenid_visa_dob</name>
      <value>${dob}</value>
   </input>
   <input>
      <name>greenid_visa_country</name>
      <value>${country}</value>
   </input>
   <input>
      <name>greenid_visa_tandc</name>
      <value>${tandc}</value>
   </input>
   </inputFields>
   </dyn:setFields>
</soapenv:Body>
</soapenv:Envelope>`


        try {
            let getFields = await greenID.post('', xmlSetVisa)
            let parsedsetFields = JSON.parse(convert.xml2json(getFields.data, { compact: true, spaces: 4 }))

            res.status(200).json({
                result: parsedsetFields
            })
        } catch (err) {
            console.log(err)
            let error
            let errorDetails
            if (err) {
                if (Array.isArray(err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g))) {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g)[0].replace(/<\/?[^>]+(>|$)/g, "")
                } else {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g).replace(/<\/?[^>]+(>|$)/g, "")
                }
                // if (Array.isArray(err.response.data.match(/<details>(.*?)<\/details>/g))) {
                //     errorDetails = err.response.data.match(/<details>(.*?)<\/details>/g)[0].replace(/<\/?[^>]+(>|$)/g, "")
                // } else {
                //     errorDetails = err.response.data.match(/<details>(.*?)<\/details>/g).replace(/<\/?[^>]+(>|$)/g, "")
                // }

                res.status(500).json({ error: error, message: 'internal server error' })

                console.log(error,)
            }



        }
    }

    static async getSources(req, res, next) {

        const { verificationid } = req.headers
        console.log(req.headers, "INI HEADERS")
        try {
            let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
            <soapenv:Header/>
            <soapenv:Body>
            <dyn:getSources>
                <accountId>${accountId}</accountId>
                <password>${password}</password>
                <verificationId>${verificationid}</verificationId>
            </dyn:getSources>
            </soapenv:Body>
            </soapenv:Envelope>`

            let getSources = await greenID.post('', xmls)
            let parsedGetSources = JSON.parse(convert.xml2json(getSources.data, { compact: true, spaces: 4 }))
            //let parsedGetSources = JSON.parse(stringifiedGetSources)
            console.log(parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['sourceList']['source'], "INI REGISTRATION DATA")
            let registrationDetails = parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['registrationDetails']
            let overallVerificationStatus = parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['overallVerificationStatus']['_text']
            console.log(parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['overallVerificationStatus'], "INI GET SOURCES")
            let currentResidentialAddress = parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['registrationDetails']['currentResidentialAddress']
            Object.keys(currentResidentialAddress).map(function (key, index) {
                currentResidentialAddress[key] = currentResidentialAddress[key]["_text"];
            });

            const arrOfObj = parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['sourceList']['source'].map(el => {
                if (!el.value) {
                    el.value = { _text: '' }
                }
                if (!el.value._text || !el.value) {
                    el.value._text = ''
                }
                let obj = {
                    [el.name._text]: el.state._text
                }
                return obj
            })
            console.log(arrOfObj, "<<<<<<")
            const objOfObj = Object.assign({}, ...arrOfObj)
            const fieldResults = parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['individualResult'].filter(element => {
                if (element['state']['_text'] === 'VERIFIED' || element['state']['_text'] === 'VERIFIED_WITH_CHANGES' || element['state']['_text'] === 'NOT_FOUND_ON_LIST') {
                    return true
                } else {
                    return false
                }
            }).filter(element => {
                if (element['fieldResult']) {
                    return true
                } else {
                    return false
                }
            }).map(element => {
                return element['fieldResult']
            })
            let individualResult = parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['individualResult'].map(el => {
                return {[el.name._text] : el.state._text}
            })
           
            let individualResultObject= Object.assign({}, ...individualResult)
            console.log(individualResultObject, "INI INDIVIDUAL RESULTS")
            let mergedFieldResults = [].concat.apply([], fieldResults).filter(el => {
                if (el['status']['_text'] == 'CONFIRMED') {
                    return true
                } else {
                    return false
                }
            })
            console.log(parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['individualResult'].filter(element => {
                if (element['state']['_text'] === 'VERIFIED' || element['state']['_text'] === 'VERIFIED_WITH_CHANGES' || element['state']['_text'] === 'NOT_FOUND_ON_LIST') {
                    return true
                } else {
                    return false
                }
            }).map(element => {
                return element['name']['_text']
            }), "INI PARSED SOURCES")
            let requiredData = {
                givenName: 0,
                surname: 0,
                dob: 0,
                flatNumber: 0,
                streetNumber: 0, //required
                streetName: 0, //required
                suburb: 0, //required
                state: 0, //required
                postcode: 0 //required
            }


            console.log(mergedFieldResults, "INI PARSED ATAS")
            //console.log(fieldResults, "INI PARSED BAWAH")
            mergedFieldResults.forEach(element => {
                for (let key in requiredData) {
                    if (key == element.name._text) {
                        requiredData[key]++
                    }



                }
            })
            let fullName = (requiredData.givenName + requiredData.surname) / 2
            let fullAdress = (requiredData.streetNumber + requiredData.streetName + requiredData.suburb + requiredData.state + requiredData.postcode) / 5
            if (objOfObj.dnb == 'VERIFIED') {
                fullAdress = fullAdress + 1
            }
            let dob = requiredData.dob
            //  fullAdress = 2
            //  fullName = 2
            //  dob = 0
            let fullNameRequired = 0
            let fullAddressRequired = 0
            let dobRequired = 0
            console.log(fullName, "INI JUMLAH FULL NAME ")
            if (fullName < 2) {
                fullNameRequired = 2 - fullName
                console.log(`${2 - (fullName)} full name needed`)

            }

            console.log(dob, "JUMLAH DOB")
            if (dob < 1) {
                dobRequired = 1 - dob
                console.log(`${1 - (dob)} date of birth needed`)

            }
            console.log(fullAdress, "INI JUMLAH FULL ADDRESS")
            if (fullAdress < 2) {
                fullAddressRequired = 2 - fullAdress
                console.log(`${2 - fullAdress} full adress needed`)
            }

            let minSourceAmount = ''
            if (fullAdress < 2 || fullName < 2 || dob < 1) {

                let min = Math.min(fullAdress - 2, fullName - 2, dob - 1)
                minSourceAmount = 0 - min
                console.log(`from at least ${0 - min} data source`)
            }
            console.log(requiredData)
            console.log("INI PARSED GET SOURCE", parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['individualResult'].filter(element => {
                if (element['state']['_text'] === 'VERIFIED') {
                    return true
                } else {
                    return false
                }
            }).map(element => {
                return element['name']['_text']
            }))
            res.status(200).json({
                fullNameCount: fullName,
                fullAddressCount: fullAdress,
                dobCount: dob,
                fullNameRequired: fullNameRequired,
                fullAddressRequired: fullAddressRequired,
                dobRequired: dobRequired,
                minSourceAmount: minSourceAmount,
                registrationDetails: registrationDetails,
                currentResidentialAddress: currentResidentialAddress,
                sources: arrOfObj,
                overallVerificationStatus: overallVerificationStatus,
                individualResult: individualResultObject

            })
        } catch (err) {
            res.status(500).json({ message: "internal server error" })
            //console.log(err)
            let error
            if (err) {
                if (Array.isArray(err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g))) {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g)[0].replace(/<\/?[^>]+(>|$)/g, "")
                } else {
                    error = err.response.data.match(/<faultstring>(.*?)<\/faultstring>/g).replace(/<\/?[^>]+(>|$)/g, "")
                }

                res.status(500).json({ error: error, message: 'internal server error' })

                console.log(err.response.data)
            }
            console.log(error, "INI ERROR")
        }
    }
    //getSources()

    static async getFields(req, res, next) {
        const { verificationid } = req.headers

        const { sourceId } = req.params
        console.log(verificationid, sourceId, "INI VERIF ID DI GETFIELDS")
        // let dataSourceName = 'qldregodvs'//dari req params
        // const verificationid = '1H93AyUcA'//dari localstorage

        let xmlsGetFields = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
       <soapenv:Header/>
       <soapenv:Body>
          <dyn:getFields>
             <accountId>${accountId}</accountId>
             <password>${password}</password>
             <verificationId>${verificationid}</verificationId>
             <sourceId>${sourceId}</sourceId>
          </dyn:getFields>
       </soapenv:Body>
    </soapenv:Envelope>`
        try {
            let getFields = await greenID.post('', xmlsGetFields)
            let parsedgetFields = JSON.parse(convert.xml2json(getFields.data, { compact: true, spaces: 4 }))
            console.log(parsedgetFields['env:Envelope']['env:Body']['ns2:getFieldsResponse']['return']['sourceFields']['fieldList']['sourceField'])
            let sourceFields = ''
            if (Array.isArray(parsedgetFields['env:Envelope']['env:Body']['ns2:getFieldsResponse']['return']['sourceFields']['fieldList']['sourceField'])) {
                sourceFields = (parsedgetFields['env:Envelope']['env:Body']['ns2:getFieldsResponse']['return']['sourceFields']['fieldList']['sourceField'].map(el => {
                    if (!el.value) {
                        el.value = { _text: '' }
                    }
                    if (!el.value._text || !el.value) {
                        el.value._text = ''
                    }
                    let obj = {
                        [el.name._text]: el.value._text
                    }
                    return obj
                }))//lihat fields untuk source data dalam bentuk object
            } else {
                sourceFields = (parsedgetFields['env:Envelope']['env:Body']['ns2:getFieldsResponse']['return']['sourceFields']['fieldList']['sourceField'])//lihat fields untuk source data dalam bentuk object
            }

            let sourceList = parsedgetFields['env:Envelope']['env:Body']['ns2:getFieldsResponse']['return']['sourceList']['source']//  lihat source list dalam bentuk object
            console.log(sourceFields)
            //console.log(sourceList)

            let concatedGetFields = getFields.data.split('\n').join('')//buat agar line break hilang dari getFields Data
            console.log(concatedGetFields, " INI GET FIELDS DATA")
            let numberOfLineBreaks = (concatedGetFields.match(/(\r\n|\n|\r)/gm) || []).length;
            console.log([numberOfLineBreaks])//mengecek apakah masih ada linebreak

            let htmlEntity = concatedGetFields.match(/<rawData>(.*?)<\/rawData>/g)//ambil pada tag rawData yang berisi html entity
            console.log(htmlEntity)

            let htmlEntityTagRemoved = htmlEntity[0].replace(/<\/?[^>]+(>|$)/g, "");//hilangkan tag <rawData></rawData> pada string 

            let htmlForm = decode(htmlEntityTagRemoved)//ubah html entity jadi format html 
            let simplerForm = htmlForm.match(/<sourcefields>(.*?)<\/sourcefields>/g)[0]
            let objFromHtml = new JSDOM(simplerForm);
            //console.log(htmlForm, "HTML FORM", simplerForm, "SIMPLE")

            console.log(simplerForm)
            res.status(200).json({
                objFromHtml: objFromHtml,
                htmlForm: simplerForm,
                sourceFields: sourceFields

            })
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
            console.log(error)
        }
    }

    static async registerCustomer(req, res, next) {
        const { givenName, middleNames, surname, email, dob, flatNumber, streetNumber, streetName, streetType, suburb, state, postcode, } = req.body





        try {
            let errorsMessages = []
            if (!givenName) {
                errorsMessages.push('Given name required')
            }
            if (!surname) {
                errorsMessages.push(`surname required`)
            }
            if (!dob) {
                errorsMessages.push(`Date of birth required`)

            }
            if (!flatNumber) {
                errorsMessages.push(`Flat number required`)

            }
            if (!streetNumber) {
                errorsMessages.push(`Street number required`)

            }
            if (!streetName) {
                errorsMessages.push(`Street name required`)

            }
            if (!suburb) {
                errorsMessages.push(`Suburb name required`)

            }
            if (!state) {
                errorsMessages.push(`State name required`)

            }
            if (!postcode) {
                errorsMessages.push(`Postcode required`)

            }

            if (errorsMessages.length > 0) {
                throw ({
                    code: 400,
                    name: "BAD_REQUEST",
                    message: errorsMessages
                })
            }
            let dobSplit = dob.split('/')
            let xmlsRegister = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
    <soapenv:Header/>
    <soapenv:Body>
       <dyn:registerVerification>
       <accountId>${accountId}</accountId>
       <password>${password}</password>
          <ruleId>default</ruleId>
          <name>
             <givenName>${givenName}</givenName>
             <honorific></honorific>
             <middleNames>${middleNames}</middleNames>
             <surname>${surname}</surname>
          </name>
          <email>${email}</email>
          <currentResidentialAddress>
             <country>AU</country>
             <state>${state}</state>
             <streetName>${streetName}</streetName>
             <streetNumber>${streetNumber}</streetNumber>
             <streetType>${streetType}</streetType>
             <suburb>${suburb}</suburb>
             <postcode>${postcode}</postcode>
          </currentResidentialAddress>
          <dob>
             <day>${dobSplit[2]}</day>
             <month>${dobSplit[1]}</month>
             <year>${dobSplit[0]}</year>
          </dob>
          <generateVerificationToken>false</generateVerificationToken>
       </dyn:registerVerification>
    </soapenv:Body>
    </soapenv:Envelope>`
            let registerResponse = await greenID.post('', xmlsRegister)
            let parsedregisterResponse = JSON.parse(convert.xml2json(registerResponse.data, { compact: true, spaces: 4 }))

            console.log(parsedregisterResponse['env:Envelope']['env:Body']['ns2:registerVerificationResponse']['return']['verificationResult']['individualResult'])
            console.log(parsedregisterResponse['env:Envelope']['env:Body']['ns2:registerVerificationResponse']['return']['verificationResult']['verificationId']['_text'])
            const verificationId = parsedregisterResponse['env:Envelope']['env:Body']['ns2:registerVerificationResponse']['return']['verificationResult']['verificationId']['_text']
            res.status(201).json({ givenName: givenName, middleNames: middleNames, surname: surname, email: email, dob: dob, flatNumber: flatNumber, streetNumber: streetNumber, streetName: streetName, streetType: streetType, suburb: suburb, state: state, postcode: postcode, verificationId: verificationId })
        } catch (error) {
            next(error)
            // res.status(500).json({ message: "internal server error" })
            console.log(error)
        }
    }
    static async mailVerified(req, res, next) {
        try {
            const { registrationDetails, currentResidentialAddress } = req.body
            console.log(registrationDetails.name.givenName._text, "INI REGIST DETAILS DI MAIL")
            let data = {
                "to": "pholiodrei@gmail.com",
                "subject": "Cogratulations, you are Verified",
                "html": `<p>Congratulations ${registrationDetails.name.givenName._text} ${registrationDetails.name.middleNames._text} ${registrationDetails.name.surname._text}, your ID have been verified </p>`,
                "company": "KYC Inc",
                "sendername": "KYC customer support"
            }
            let sendMail = await restDb.post('https://testdatabase-61b1.restdb.io/mail', data)
            res.status(200).json({ message: "verification mail successfully sent" })
            console.log(sendMail, "INI SENT MAIL")
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async addVerifiedCostumer(req, res, next) {
        try {
            const { registrationDetails, currentResidentialAddress } = req.body
            const { verificationid } = req.headers
            console.log(req.headers, "INI REGIST DETAILS DI MAIL")

            const fullName = `${registrationDetails.name.givenName._text} ${registrationDetails.name.middleNames._text} ${registrationDetails.name.surname._text}`

            const fullAddres = ` ${currentResidentialAddress.streetName} ${currentResidentialAddress.streetType} ${currentResidentialAddress.streetNumber} ${currentResidentialAddress.suburb} ${currentResidentialAddress.state} ${currentResidentialAddress.postcode} ${currentResidentialAddress.country}`

            let day = registrationDetails.dob.day._text
            let month = registrationDetails.dob.month._text
            let year = registrationDetails.dob.year._text
            if (Number(day) < 10) {
                day = '0' + day
            }
            if (Number(month) < 10) {
                month = '0' + month
            }
            const dob = `${day}/${month}/${year}`
            console.log(fullName, dob, fullAddres, verificationid, "INI DATA BUAT ADD CUSTOMER")
            const customer  = await Customer.create({ name: fullName,  verificationId: verificationid, address: fullAddres, dateOfBirth:dob})
            
            res.status(200).json({ message:`verified customer successfully added to database`, fullName:fullName, fullAddres:fullAddres, dob:dob, })
            
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}

module.exports = Controller