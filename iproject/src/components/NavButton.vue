<template>
   <button
    @click="navHandler"
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
</template>

<script>
export default {
    name: 'NavButton',
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
}
</script>

<style>

</style>