<template>
  <div class="container">
    <h3 class="text-center">Verify using Australian Electoral Roll</h3>

    <form class="p-2" @submit.prevent="test">
      <div class="form-group" >
          
        <label for="givenName"> Given Name (without middle names)*</label>
        <input
        v-model="registrationDetails.registrationDetails.name.givenName._text"
          type="text"
          class="form-control"
          id="givenName"
          name="givenName"
          aria-required="true"
          placeholder="Enter Given Name"
        />
      </div>
      <br />
      <div class="form-group">
          
        <label for="surname">Surname*</label>
        <input
        v-model="registrationDetails.registrationDetails.name.surname._text"
          type="text"
          class="form-control"
          id="surname"
          name="surname"
          aria-required="true"
          placeholder="Enter Last Name"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="email">Flat Number</label>
        <input
        
          type="text"
          class="form-control"
          id="flatNumber"
          name="flatNumber"
          aria-required="false"
          placeholder="Enter Flat Number"
        />
      </div>
      <br /> 
      <div class="form-group">
        <label for="streetNumber">Street Number</label>
        <input
        v-model="registrationDetails.registrationDetails.currentResidentialAddress.streetNumber._text"
          type="text"
          class="form-control"
          id="streetNumber"
          name="streetNumber"
          aria-required="true"
          placeholder="Enter street number"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="streetName">Street Name</label>
        <input
         v-model="registrationDetails.registrationDetails.currentResidentialAddress.streetName._text"
          type="text"
          class="form-control"
          id="streetName"
          name="streetName"
          aria-required="true"
          placeholder="Enter street name"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="streetNumber">Street Type</label>
        <br />
        
        <select  v-model="registrationDetails.registrationDetails.currentResidentialAddress.streetType._text" name="streetType" id="" aria-required="false">
            
          <option value="" selected="selected" disabled>
            Please select street type
          </option>
          <option value="AVE">Avenue</option>
          <option value="CIR">Circle</option>
          <option value="CCT">Circuit</option>
          <option value="CL">Close</option>
          <option value="CT">Court</option>
          <option value="CRES">Crescent</option>
          <option value="DR">Drive</option>
          <option value="ESP">Esplanade</option>
          <option value="EXP">Expressway</option>
          <option value="HWY">Highway</option>
          <option value="LANE">Lane</option>
          <option value="PDE">Parade</option>
          <option value="PL">Place</option>
          <option value="RD">Road</option>
          <option value="SQ">Square</option>
          <option value="ST">Street</option>
          <option value="TCE">Terrace</option>
          <option value="WAY">Way</option>
          <option value= undefined >Other</option>
        </select>
      </div>
      <br />
      <div class="form-group">
        <label for="suburb">Suburb</label>
        <input
        v-model="registrationDetails.registrationDetails.currentResidentialAddress.suburb._text" 
          type="text"
          class="form-control"
          id="suburb"
          name="suburb"
          aria-required="true"
          placeholder="Enter suburb name"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="state">State</label>
        <br />
        <select v-model="registrationDetails.registrationDetails.currentResidentialAddress.state._text"  name="state" id="" aria-required="true">
          <option value="" selected="selected" disabled>
            Please select State
          </option>
          <option value="NSW">New South Wales</option>
          <option value="VIC">Victoria</option>
          <option value="QLD">Queenslands</option>
          <option value="SA">South Australia</option>
          <option value="TAS">Tasmania</option>
          <option value="WA">Western Australia</option>
          <option value="NT">Northern Territory</option>
          <option value="ACT">Australian Capital Territory</option>
        </select>
      </div>
      <br />
      <div class="form-group">
        <label for="postcode">Postcode</label>
        <input
        v-model="registrationDetails.registrationDetails.currentResidentialAddress.postcode._text"
          type="number"
          class="form-control"
          id="postcode"
          name="postcode"
          aria-required="true"
        />
      </div>
      <br />
      <button type="submit" class="btn btn-success">Submit</button>
      <button
        type="button"
        class="btn btn-warning ml-3"
        @click.prevent="backHandler"
      >
        Back
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Aec",
  methods: {
    backHandler() {
      this.$router.push("/");
    },
      test(submitEvent) {
     console.log(submitEvent.target.elements.givenName.value, "INI MSDUK TEST")
     let body = {
        givenName: submitEvent.target.elements.givenName.value,
        surname: submitEvent.target.elements.surname.value,
        flatNumber: submitEvent.target.elements.flatNumber.value,
         streetNumber: submitEvent.target.elements.streetNumber.value,
         streetName: submitEvent.target.elements.streetName.value,

        streetType: submitEvent.target.elements.streetType.value,
         suburb: submitEvent.target.elements.suburb.value,
         state: submitEvent.target.elements.state.value,
         postcode: Number(submitEvent.target.elements.postcode.value),
      };
      console.log(body)
      this.$store.dispatch("postAec", body)
      this.$router.push("/")
    },
    async fetchRegistrationDetails() {
      await this.$store.dispatch("fetchRegistrationDetails");
    },
  },
  created() {
    this.fetchRegistrationDetails();
  },
  computed: {
    registrationDetails() {
      return this.$store.state.registrationDetails;
    },
  },
};
</script>

<style>
</style>