require("dotenv").config()
const axios = require('axios')
const convert = require('xml-js');
const parseString = require('xml2js').parseString;
const greenID = require("./apis/greenID")
const htmlEntities = require('html-entities') ;
const decode = require('html-entities-decoder')


//require 2 full names, 1 DOB, and 2 addresses from 2 datasources
let accountId = process.env.GREEN_ID_ACCOUNT
let password = process.env.GREEN_ID_PASSWORD

let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
<soapenv:Header/>
<soapenv:Body>
   <dyn:getSources>
      <accountId>${accountId}</accountId>
      <password>${password}</password>
      <verificationId>${'NZOTVolQ'}</verificationId>
   </dyn:getSources>
</soapenv:Body>
</soapenv:Envelope>`
async function getSources(req, res, next) {
   try {

      // let getSources = await axios.post('https://test-au.vixverify.com/Registrations-Registrations/DynamicFormsServiceV3', xmls, {
      //    headers:
      //       { 'Content-Type': 'text/xml' }
      // })
      let getSources = await greenID.post('', xmls)
      let parsedGetSources = JSON.parse(convert.xml2json(getSources.data, { compact: true, spaces: 4 }))
      //let parsedGetSources = JSON.parse(stringifiedGetSources)
      console.log(getSources, "INI GET SOURCES")
      const fieldResults = parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['individualResult'].filter(element => {
         if (element['state']['_text'] === 'VERIFIED' || element['state']['_text'] === 'NOT_FOUND_ON_LIST') {
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
      let mergedFieldResults = [].concat.apply([], fieldResults).filter(el => {
         if (el['status']['_text'] == 'CONFIRMED') {
            return true
         } else {
            return false
         }
      })
      console.log(parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['individualResult'].filter(element => {
         if (element['state']['_text'] === 'VERIFIED' || element['state']['_text'] === 'NOT_FOUND_ON_LIST') {
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
       let fullName = (requiredData.givenName + requiredData.surname)/2
       let fullAdress = (requiredData.streetNumber + requiredData.streetName + requiredData.suburb + requiredData.state + requiredData.postcode)/5
       let dob = requiredData.dob
      //  fullAdress = 2
      //  fullName = 2
      //  dob = 0
       console.log(fullName, "INI JUMLAH FULL NAME ")
       if (fullName < 2) {
          
         console.log(`${2 - (fullName)} full name needed`)

      }

      console.log(dob, "JUMLAH DOB")
      if (dob < 1) {
         
        console.log(`${1 - (dob)} date of birth needed`)

     } 
      console.log(fullAdress, "INI JUMLAH FULL ADDRESS")
      if (fullAdress < 2)  {
         
         console.log(`${2 - fullAdress} full adress needed`)
      }
     

      if (fullAdress < 2 || fullName < 2 || dob < 1) {
         
         let min = Math.min(fullAdress-2, fullName-2, dob-1)
         console.log(`from at least ${0 - min} data source`)
      }
       console.log(requiredData)
      // console.log("INI PARSED GET SOURCE", parsedGetSources['env:Envelope']['env:Body']['ns2:getSourcesResponse']['return']['verificationResult']['individualResult'].filter(element => {
      //    if (element['state']['_text'] === 'VERIFIED') {
      //       return true
      //    } else {
      //       return false
      //    }
      // }).map(element => {
      //    return element['name']['_text']
      // }))

   } catch (err) {
      console.log(err)
   }
}
//getSources()


async function registerCustomer (req, res, next) {
   // const {givenName, middleNames, surname, email, dob, flatNumber, streetNumber, streetName, streetType, suburb, state, postcode,  } = req.body
   const body = {
      givenName: "Hello", 
      middleNames: '2-PPPPP', 
      surname: 'Happy', 
      email:"happy@mail.com",
      dob: '1987-08-31', 
      flatNumber: `${Math.floor(Math.random() * 100)}`, 
      streetNumber: `${Math.floor(Math.random() * 100)}`, 
      streetName: 'Sesame', 
      streetType: '', 
      suburb: "Sauce", 
      state: 'TAS', 
      postcode: '7799'
   }
   let dobSplit = body.dob.split('-')
   let xmlsRegister = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
<soapenv:Header/>
<soapenv:Body>
   <dyn:registerVerification>
   <accountId>${accountId}</accountId>
   <password>${password}</password>
      <ruleId>default</ruleId>
      <name>
         <givenName>${body.givenName}</givenName>
         <honorific></honorific>
         <middleNames>${body.middleNames}</middleNames>
         <surname>${body.surname}</surname>
      </name>
      <email>${body.email}</email>
      <currentResidentialAddress>
         <country>AU</country>
         <state>${body.state}</state>
         <streetName>${body.streetName}</streetName>
         <streetNumber>${body.streetNumber}</streetNumber>
         <streetType>${body.streetType}</streetType>
         <suburb>${body.suburb}</suburb>
         <postcode>${body.postcode}</postcode>
      </currentResidentialAddress>
      <dob>
         <day>${dobSplit[0]}</day>
         <month>${dobSplit[1]}</month>
         <year>${dobSplit[2]}</year>
      </dob>
      <generateVerificationToken>false</generateVerificationToken>
   </dyn:registerVerification>
</soapenv:Body>
</soapenv:Envelope>` 
   try {
      let registerResponse = await greenID.post('', xmlsRegister)
      let parsedregisterResponse = JSON.parse(convert.xml2json(registerResponse.data, { compact: true, spaces: 4 }))
      console.log(parsedregisterResponse['env:Envelope']['env:Body']['ns2:registerVerificationResponse']['return']['verificationResult']['individualResult'])
      let verificationId = parsedregisterResponse['env:Envelope']['env:Body']['ns2:registerVerificationResponse']['return']['verificationResult']['verificationId']['_text']
      console.log(verificationId, "INI VERIF ID")
   } catch (error) {
      console.log(error)
   }
}
//registerCustomer()
let dataSourceName = 'qldregodvs'
async function getFields (req, res, next) {
   // const {givenName, middleNames, surname, email, dob, flatNumber, streetNumber, streetName, streetType, suburb, state, postcode,  } = req.body
   const body = {
      givenName: "Hello", 
      middleNames: '2-PPPPP', 
      surname: 'Happy', 
      email:"happy@mail.com",
      dob: '1987-08-31', 
      flatNumber: `${Math.floor(Math.random() * 100)}`, 
      streetNumber: `${Math.floor(Math.random() * 100)}`, 
      streetName: 'Sesame', 
      streetType: '', 
      suburb: "Sauce", 
      state: 'TAS', 
      postcode: '7799'
   }
   let dobSplit = body.dob.split('-')
   let xmlsGetFields = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dyn="http://dynamicform.services.registrations.edentiti.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <dyn:getFields>
         <accountId>${accountId}</accountId>
         <password>${password}</password>
         <verificationId>1H93AyUcA</verificationId>
         <sourceId>${dataSourceName}</sourceId>
      </dyn:getFields>
   </soapenv:Body>
</soapenv:Envelope>`
   try {
      let getFields = await greenID.post('', xmlsGetFields)
      let parsedgetFields = JSON.parse(convert.xml2json(getFields.data, { compact: true, spaces: 4 }))
      let sourceFields = ( parsedgetFields['env:Envelope']['env:Body']['ns2:getFieldsResponse']['return']['sourceFields']['fieldList']['sourceField'].map(el => {
        return [el.name, el.value]
      }))
      let sourceList = parsedgetFields['env:Envelope']['env:Body']['ns2:getFieldsResponse']['return']['sourceList']['source']//  daftar resource list
      console.log(sourceFields)
      console.log(sourceFields)
      let reg = /<rawData>[a-z]*<\/rawData>/gi//.exec(getFields.data)
      let concated = getFields.data.split('\n').join('')
      console.log( concated, " INI GET FIELDS DATA")
      let strs =``
      let numberOfLineBreaks = (concated.match(/(\r\n|\n|\r)/gm)||[]).length;
      let htmlForm = getFields.data.match(reg)
      console.log([numberOfLineBreaks])
      let str = `<rawData>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;&lt;sourcefields&gt; &lt;div class=&quot;row&quot;&gt; &lt;div class=&quot;form-r oup col-sm-3&quot;&gt; &lt;label class=&quot;control-label&quot; for=&quot;greenid_qldregodvs_number&quot;&gt;Licence number &lt;span class=&quot;greenid-helpicon&quot; title=&quot;qldregodvs_number_tooltip&quot;&gt;&lt;/span&gt;</rawData>`
      
      let htmlEntity = concated.match(/<rawData>(.*?)<\/rawData>/g)
      console.log( htmlEntity, "INI FORM", )
      let htmls = htmlEntity.replaceAll("<[^>]*>", "");
      let form = decode(htmls)
      console.log(form)
   } catch (error) {
      console.log(error)
   }
}
getFields()

// console.log(decode(`&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;&lt;sourcefields&gt; &lt;div class=&quot;row&quot;&gt; &lt;div class=&quot;form-group col-sm-3&quot;&gt; &lt;label class=&quot;control-label&quot; for=&quot;greenid_qldregodvs_number&quot;&gt;Licence number &lt;span class=&quot;greenid-helpicon&quot; title=&quot;qldregodvs_number_tooltip&quot;&gt;&lt;/span&gt;
// &lt;/label&gt; &lt;input aria-required=&quot;true&quot; class=&quot;form-control ausdriverslicencenumbervalidation required&quot; id=&quot;greenid_qldregodvs_number&quot; name=&quot;greenid_qldregodvs_number&quot; type=&quot;text&quot; value=&quot;&quot;/&gt; &lt;/div&gt; &lt;/div&gt; &lt;div class=&quot;row&quot;&gt; &lt;div class=&quot;form-group col-sm-4&quot;&gt; &lt;label cls 
// s=&quot;control-label&quot; for=&quot;greenid_qldregodvs_givenname&quot;&gt;First name&lt;/label&gt; &lt;input aria-required=&quot;true&quot; class=&quot;form-control namevalidation required&quot; id=&quot;greenid_qldregodvs_givenname&quot; name=&quot;greenid_qldregodvs_givenname&quot; type=&quot;text&quot; value=&quot;Hortensia&quot;/&gt; &lt;/div&gt; &lt;div class=&quot;form-group col-sm-4&quot;&gt; &lt;label class=&quot;control-label&quot; for=&quot;greenid_qldregodvs_middlename&quot;&gt;Middle name(s)&lt;/label&gt; &lt;input aria-required=&quot;false&quot; class=&quot;form-control&quot; id=&quot;greenid_qldregodvs_middlename&quot; name=&quot;greenid_qldregodvs_middlename&quot; type=&quot;text&quot; value=&quot;Azure&quot;/&gt; &lt;/div&gt; &lt;div class=&quot;form-group col-sm-4&quot;&gt; &lt;label class=&quot;control-label&quot; for=&quot;greenid_qldregodvs_surname&quot;&gt;Surname&lt;/label&gt; &lt;input aria-required=&quot;true&quot; class=&quot;form-control namevalidation required&quot; id=&quot;greenid_qldregodvs_surname&quot; name=&quot;greenid_qldregodvs_surname&quot; type=&quot;text&quot; value=&quot;Lepaute&quot;/&gt; &lt;/div&gt; &lt;/div&gt; &lt;div class=&quot;row&quot;&gt; &lt;div class=&quot;form-group col-sm-3 col-lg-2&quot;&gt; &lt;label class=&quot;control-label&quot; for=&quot;greenid_qldregodvs_dob&quot;&gt;Date of birth (dd/mm/yyyy)&lt;/label&gt; &lt;div class=&quot;input-group date&quot;&gt; &lt;input aria-required=&quot;true&quot; class=&quot;form-control dobvalidation required&quot; id=&quot;greenid_qldregodvs_dob&quot; name=&quot;greenid_qldregodvs_dob&quot; type=&quot;text&quot; value=&quot;03/09/1991&quot;/&gt; &lt;span class=&quot;input-group-addon greenid-datepicker&quot;&gt;
// &lt;span class=&quot;glyphicon glyphicon-calendar&quot;&gt;&lt;/span&gt;
// &lt;/span&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;div class=&quot;checkbox&quot;&gt; &lt;label class=&quot;control-label&quot; for=&quot;greenid_qldregodvs_tandc&quot;&gt; &lt;input aria-required=&quot;true&quot; class=&quot;required&quot; id=&quot;greenid_qldregodvs_tandc&quot; name=&quot;greenid_qldregodvs_tandc&quot; type=&quot;checkbox&quot;/&gt; I consent to the information above being checked with the Issuer or Official Record Holder &lt;/label&gt; &lt;/div&gt; &lt;/sourcefields&gt;`))
 
    
