<template>
  <div class="container">
    <h3 class="text-center">Profile</h3>
    <div class="border mb-1 bg-white">
      
      <ul>
        <li>
          
          <b>Nama</b>:
          {{registrationDetails.name.givenName._text}}
          {{registrationDetails.name.surname._text }}
        </li>
        <li>
          <b>Address</b>:
          {{registrationDetails.currentResidentialAddress.streetName._text, }}
          {{registrationDetails.currentResidentialAddress.streetType._text, }}
          {{registrationDetails.currentResidentialAddress.streetNumber._text, }}
          {{registrationDetails.currentResidentialAddress.suburb._text, }}
          {{registrationDetails.currentResidentialAddress.state._text, }}
          {{registrationDetails.currentResidentialAddress.country._text, }}
        </li>
        <li>
          <b>Date of Birth</b>:
          {{ordinal(registrationDetails.dob.day._text)}}
          {{
            getMonthName(registrationDetails.dob.month._text)
          }}
          {{registrationDetails.dob.year._text, }}
        </li>
        <li><b>Email address</b>:  {{registrationDetails.email._text}}</li>
      </ul>
    </div>
    <p></p>
    <div
    
      class="
        text-center
        mb-2
        bg-gradient bg-secondary
        border
        rounded
        text-white
        h-auto
      "
      style="height: 80px"
    >
            <p class="mt-3 mb-0">You are not verified yet</p>
      <p class="">Verify yourself by filling in data sources below</p>
    </div>
    <div
    
      class="
      
        text-center
        mb-2
        bg-gradient bg-secondary
        border
        rounded
        text-white
        h-auto
      "
      style="height: 80px"
    >
            
      <strong> {{registrationDetails.fullNameRequired}} full names, {{registrationDetails.dobRequired}} date of birth and {{registrationDetails.fullAddressRequired}} full address are required from at least {{registrationDetails.minSourceAmount}} sources </strong>
    </div>
    <div
    v-if="registrationDetails.overallVerificationStatus == 'VERIFIED'"
      class="text-center mb-2 bg-gradient bg-success border rounded text-white h-auto"
      style="height: 100px"
    >
      <div class="float-left"></div>

      <p class="mt-3 mb-0">Congratulations!</p>
      <p class="mb-0">You are verified</p>
      <p>Click Next to finish the process
        {{sourceList.nswregodvs}}
      </p>
    </div>
    <p>Verification Progress</p>
    <div
      class="progress mb-2 bg-light border border-dark"
      style="width: 50%; height: 30px"
    >
      <div
      v-bind:style="[percentage == 0 ? `width: ${percentage}%`  :`width: ${percentage}%` ]"

        ref="progressBar"
        style="height: 30px; text-align: center; "
        class="progress-bar bg-success"
        role="progressbar"
        aria-valuenow="2"
        aria-valuemin="0"
        aria-valuemax="5"
      >
        {{percentage}}%
      </div>
      <br />
      <br />
      <br />
    </div>
    
    <button
    
    v-bind:class="[sourceList.nswregodvs ==='VERIFIED' ? 'btn-success' : sourceList.nswregodvs ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    @click="driverLicenseHandler"
      type="button"
      data-toggle="tooltip"
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.nswregodvs ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
        
      >
      <svg
      v-if="sourceList.nswregodvs ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >New South Wales Driver's Licence - DVS (name, date of birth)
    </button>
    <button
    
    v-bind:class="[sourceList.vicregodvs ==='VERIFIED' ? 'btn-success' : sourceList.vicregodvs ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    @click="driverLicenseHandler"
      type="button"
      data-toggle="tooltip"
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.vicregodvs ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.vicregodvs ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Victorian Driver's Licence - DVS (name, date of birth)
    </button>

    <button
    
    v-bind:class="[sourceList.qldregodvs ==='VERIFIED' ? 'btn-success' : sourceList.qldregodvs ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    @click="driverLicenseHandler"
      type=""
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.qldregodvs ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.qldregodvs ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Queenslands Driver's Licence - DVS (name, date of birth)
    </button>

    <button
    
    v-bind:class="[sourceList.saregodvs ==='VERIFIED' ? 'btn-success' : sourceList.saregodvs ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    @click="driverLicenseHandler"
      type=""
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.saregodvs ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.saregodvs ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >South Australian Driver's Licence - DVS (name, date of birth)
    </button>

    <button
    
    v-bind:class="[sourceList.waregodvs ==='VERIFIED' ? 'btn-success' : sourceList.waregodvs ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    @click="driverLicenseHandler"
      type=""
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.waregodvs ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.waregodvs ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Western Australian Driver's Licence - DVS (name, date of birth)
    </button>

    <button
    @click="driverLicenseHandler"
    v-bind:class="[sourceList.actregodvs ==='VERIFIED' ? 'btn-success' : sourceList.actregodvs ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    
      type=""
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.actregodvs ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.actregodvs ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Australian Capital Territory Driver's Licence - DVS (name, date of birth)

    </button>

    <button
    @click="visaHandler"
    v-bind:class="[sourceList.visa ==='VERIFIED' ? 'btn-success' : sourceList.visa ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    
      type=""
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.visa ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.visa ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Australian Visas (Date of Birth)
    </button>

    <button
    @click="aecHandler"
    v-bind:class="[sourceList.aec ==='VERIFIED' ? 'btn-success' : sourceList.aec ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    
      type=""
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.aec ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.aec ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Australian Electoral Roll (name, address)
    </button>


    <button
    @click="dnbHandler"
    v-bind:class="[sourceList.dnb ==='VERIFIED' ? 'btn-success' : sourceList.dnb ==='FAILED' ?'btn-danger' : 'bg-secondary' ]"
    
      type=""
      class="btn btn-secondary mb-2"
      style="; display: inline-block; width: 100%"
    >
      <svg
      v-if="sourceList.dnb ==='FAILED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        /></svg
      >
      <svg
      v-if="sourceList.dnb ==='VERIFIED'"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check"
        viewBox="0 0 16 16"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        /></svg
      >Credit History File (name, and/or address and/or date of birth)
    </button>
    
    <br />

   
    <button v-if="registrationDetails.overallVerificationStatus == 'VERIFIED'" type="button" class="btn btn-success float-right mb-2">Next</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
        return {
            
            sourceNames :[
              `New South Wales Driver's Licence - DVS`,
              `Victorian Driver's Licence - DVS`,
              `Queensland Driver's Licence`,
              `South Australian Driver's Licence`,
              `Western Australian Driver's Licence`,
              `Australian Capital Territory Driver's Licence`,
              `Australian Visas`,
              `Australian Electoral Roll`,
              `Credit History File`
            ]
        }
    },
  created() {
    this.fetchRegistrationDetails();
    console.log(this.$store.state.registrationDetails, "INI REGIST DI CREATED")
    this.fetchSourceList()
    console.log(this.$store.state.sourceList, "INI SOURCE DI CREATED")
  },

  methods: {
    async fetchRegistrationDetails() {
      console.log("ini fetch registration")
      await this.$store.dispatch("fetchRegistrationDetails");
    },
    async fetchSourceList() {
      console.log('masuk sourcelist')
      await this.$store.dispatch("fetchSourceList");
    },
    getMonthName(month) {
      const d = new Date();
      d.setMonth(month - 1);
      const monthName = d.toLocaleString("default", { month: "long" });
      return monthName;
    },
    ordinal(number) {
      const ordinalRules = new Intl.PluralRules("en", {
        type: "ordinal",
      });
      const suffixes = {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th",
      };
      const suffix = suffixes[ordinalRules.select(number)];
      return number + suffix;
    },
    driverLicenseHandler() {
      this.$router.push('/driverlicence')
    },
    aecHandler() {
      this.$router.push('/aec')
    },
    visaHandler() {
      this.$router.push('/visa')
      //
    },
    dnbHandler() {
      this.$router.push('/dnb')
    }
    // setProgressBarWidth() {
    //   console.log()
    //   this.$refs['progressBar'].style.width = '100%';
    // }
  },
  computed: {
     registrationDetails() {
      console.log(this.$store.state.registrationDetails, "INI DI COMPUTED")
      
      return  this.$store.state.registrationDetails.registrationDetails;
    },
    percentage() {
      return (this.$store.state.registrationDetails.fullNameCount + this.$store.state.registrationDetails.fullAddressCount + this.$store.state.registrationDetails.dobCount)/5*100
    },
    sourceList() {
      return Object.assign({}, ...this.$store.state.sourceList.data.sources);
    },
    
    
  },
};
</script>
