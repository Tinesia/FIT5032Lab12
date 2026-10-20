<template>
  <div class="about">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 col-12 offset-md-2 ">

          <h1 class="text-center">Login</h1>
          <form @submit.prevent="login">
            <div class="row mb-3">
              <div class="col-12 mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" id="username" class="form-control" v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)">
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              </div>
              
              <div class="col-12 mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" id="password" class="form-control" v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)">
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>

            </div>
            
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
            </div>
          </form>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isAuthenticated } from '../auth'
import users from "../assets/json/users.json"

const router = useRouter()
const route = useRoute()

const userLogin = users[0]

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: '',
  password: ''
})

const validateName = (blur) => {
  if (!formData.value.username) {
    errors.value.username = 'Username is required'
  } else {
    errors.value.username = ''
  }
}

const validatePassword = (blur) => {
  if (!formData.value.password) {
    errors.value.password = 'Password is required'
  } else {
    errors.value.password = ''
  }
}

const login = () => {
  validateName(true)
  validatePassword(true)

  if (!errors.value.username && !errors.value.password) {
    
    if (formData.value.username === userLogin.username && formData.value.password === userLogin.password) {
      
      isAuthenticated.value = true
      router.push(route.query.redirect || '/about')

    } else {
      errors.value.username = 'Invalid username or password'
      errors.value.password = 'Invalid username or password'
    }
  }
}


</script>

<style>
</style>