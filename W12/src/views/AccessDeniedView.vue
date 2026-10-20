<template>
  <div class="container mt-5">
    <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Access Denied</h1>
        <p class="text-center">Please log in to access this page.</p>
        <router-link to="/login">
            <button type="button" class=" btn btn-primary d-block mx-auto">Login</button>
        </router-link>
    </div>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

</style>