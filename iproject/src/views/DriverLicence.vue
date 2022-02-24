<template>
  <div class="container">
    <h3 class="text-center">Please Fill in your '' Driver's Licence Data</h3>
    <form class="p-2">
      <div class="form-group">
        <label for="driverLicenceNumber">Licence Number*</label>
        <input type="number" class="form-control" id="driverLicenceNumber" name="driverLicenceNumber"
          aria-required="true" placeholder="Enter Licence Number">
        <br>
      </div>
      <div class="form-group">
        <label for="givenName">First Name*</label>
        <input type="text" class="form-control" id="givenName" name="givenName" aria-required="true"
          placeholder="Enter First Name">
        <br>
      </div>
      <div class="form-group">
        <label for="middleNames">Middle Names</label>
        <input type="text" class="form-control" id="middleNames" name="middleNames" aria-required="false"
          placeholder="Enter Middle Names">

      </div>
      <br>
      <div class="form-group">
        <label for="surname">Lastname Names</label>
        <input type="text" class="form-control" id="surname" name="surname" aria-required="true"
          placeholder="Enter Last Name">

      </div>
      <br>
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input type="date" class="form-control" id="dob" name="dob" aria-required="true" placeholder="Enter Last Name">

      </div>

      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="tandc" name="tandc" value="on">
        <label class="form-check-label" for="exampleCheck1">I agree to have the information above checked with the
          Issuer or Official Record Holder</label>
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
      <button type="button" class="btn btn-warning" @click.prevent="backHandler">Back</button>
    </form>
  </div>
</template>

<script>
export default {

    name: "DriverLicence",
    
    methods:  {
        backHandler() {
           this.$router.push("/");
        },
        fetchFieldData(id) {
         this.$store.dispatch("fetchSourceList", id)
        }
    }
}
</script>

<style>

</style>