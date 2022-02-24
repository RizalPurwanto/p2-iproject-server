<template>
   <div class="container">
    <h3 class="text-center">Illion Credit Header</h3>
    <br>
    <div class="border p-2 text-align text-center bg-white">
      <p>By accepting these terms and conditions you give consent for KMoney Transfer to disclose your name, residential
        address and date of birth to a credit reporting agency and ask the credit reporting agency to provide an
        assessment of whether the personal information so provided matches (in whole or in part) personal information
        contained in a credit information file in the possession or control of the credit reporting agency to assist in
        verifying your identity for the purposes of the Anti-Money Laundering and Counter-Terrorism Act 2006. The credit
        reporting agency may prepare and provide KMoney Money Transfer with such an assessment and may use your personal
        information including the names, residential addresses and dates of birth contained in credit information files
        of you and other individuals for the purposes of preparing such an assessment. If you disagree with having your
        identity verified by a credit reporting agency, please select another data source or contact KMoney Money
        Transfer so that we can discuss other options with you.</p>
    </div>

    <form class="p-2">
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="tandc" name="tandc" value="on">
        <label class="form-check-label" for="exampleCheck1">I agree to provide consent and accept the above terms and
          conditions.</label>
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
      <button type="button" class="btn btn-warning" @click.prevent="backHandler">Back</button>
    </form>
  </div>
</template>

<script>
export default {
    name:"Dnb",
     methods:  {
        backHandler() {
           this.$router.push("/");
        }
    }

}
</script>

<style>

</style>