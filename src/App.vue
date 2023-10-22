<script setup>
  import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-link" :class="{ 'active-link': $route.path === '/' }">Table</RouterLink>
    <RouterLink to="/map" class="nav-link" :class="{ 'active-link': $route.path === '/map' }">Map</RouterLink>
  </nav>
  <RouterView/>
</template>

<style>
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;

}
::-webkit-scrollbar {
      width: 0.7rem; 
      height: 0.7rem;
}
    
::-webkit-scrollbar-track {
     background: white;
   }
    
::-webkit-scrollbar-thumb {
  background: #009879;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 15px;
}

.nav-link.active-link {
  background-color: #009879;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}

a, a:hover, a:focus, a:active {
      text-decoration: none;
      color: inherit;
      width: 50px;
 }
</style>
