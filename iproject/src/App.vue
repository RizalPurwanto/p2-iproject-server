<template>
<div>
<Header></Header>
  <div id="app">
   
    <router-view></router-view >
    
    <!-- <Footer></Footer> -->
    
  </div>
  <HFooter></HFooter>
</div>

</template>

<script>
import Header from "../src/components/Header.vue"
//import Footer from "../src/components/Footer.vue"
import HFooter from 'vue-hacktiv8-footer'
export default {
  name: "App",
  components: {
    Header,
    // Footer,
    HFooter
    
  }
}
</script>

<style>
* { 
	margin: 0; 
	padding: 0; 
} 
html{
  height: 100%;
}

body{
    background-color:white;
    
    height: 100%;
  }
  .header{
    width:103%;
    height:18%;
    left:-1%;
    margin-top: -10%;
    position:absolute;
    background-color: #164100;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius: 50% 20%;
    border-bottom-right-radius: 50% 20%;

  }
  .headerInside {
    width:103%;
    height:20%;
    left:-1%;
    margin-top: -10%;
    margin-bottom: 5%;
    position:absolute;
    background-color:#f5de2a;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius: 50% 20%;
    border-bottom-right-radius: 50% 20%;  
  }
  .container{
    margin: top;
    width: 50%;
    height: 50%;
    margin-top: 10%;
    margin-bottom: 10%;
    background-color:rgb(241, 241, 241);
    
    position:relative;
    
    overflow:hidden;
    
    border: grey solid;
    
  }

ul {
  list-style: none;
  display: table;
}

li {
  display: table-row;
}

b {
  display: table-cell;
  padding-right: 1em;
}

  footer {
    position: fixed;
    margin-top: 0%;
    width: 100%;
    height: 100px;
    bottom: 0;
    overflow: hidden;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
