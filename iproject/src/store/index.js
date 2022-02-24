import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isRegister: localStorage.verificationId ? true : false,
    registrationDetails: '',
    fieldData: '',
    sourceList: [],


  },
  mutations: {
    setRegistrationDetails(state, registrationDetails) {
      state.registrationDetails = registrationDetails
      console.log(state.registrationDetails.data.verificationId, "INI STATE REGISTRATION DETAILS")
      
    },
    setVerificationId(state) {
      console.log(state.registrationDetails.data, "INI STATE VERIF")
     localStorage.setItem("verificationId", state.registrationDetails.data.verificationId)
      
    },
    setFieldData(state, fieldData) {
      state.fieldData = fieldData
      console.log(state.fieldData, "INI FIELD DATA")
    },
    setSourceList(state, sourceList) {
      state.sourceList = sourceList
      console.log(state.sourceList, "INI FIELD DATA")
    },
    setRegister(state, boolean) {
      state.isRegister = boolean
      console.log(state.isRegister, "INI ISREGISTER")
    }
  },
  actions: {
     async fetchRegistrationDetails(context) {
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      axios.get('http://localhost:3000/verify/sources', {
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp.data, "INI  RESP REGISTRATION DETAILs")
          context.commit("setRegistrationDetails", resp.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchFieldData(context, id) {
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      axios.get(`http://localhost:3000/verify/sources/${id}`, {
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI  FIELD DATA")
          context.commit("setFieldData", resp)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchSourceList(context) {
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      axios.get('http://localhost:3000/verify/sources', {
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI SOURCE LIST")
          context.commit("setSourceList", resp)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async postDriverLicence(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = {
        driverLicenceNumber: '',
        givenName: '',
        middlenames: '',
        surname: '',
        dob: '',
        tandc: ''
      }
      axios.post('http://localhost:3000/verify/driverlicence/actregodvs', {
        body,
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI SOURCE LIST")

        })
        .catch((err) => {
          console.log(err);
        });
    },
    async postAec(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID di AEC")
      let body = payload
      axios.post('http://localhost:3000/verify/aec', body, {
        
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI AEC")
          
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async postDnb(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = {
        tandc: ''
      }
      axios.post('http://localhost:3000/verify/dnb', {
        body,
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI DNB")

        })
        .catch((err) => {
          console.log(err);
        });
    },

    async postVisa(context, payload) {
      console.log(payload, "INI PAYLOAD")
      const verificationId = localStorage.getItem("verificationId")
      console.log(verificationId, "INI VERIFICATION ID")
      let body = {
        visaNumber: '',
        surname: '',
        dob: '',
        country: '',
        tandc: ''
      }
      axios.post('http://localhost:3000/verify/dnb', {
        body,
        headers: {
          verificationId: verificationId
        }
      })
        .then((resp) => {
          console.log(resp, "INI DNB")

        })
        .catch((err) => {
          console.log(err);
        });
    }


  },
  modules: {},
});
