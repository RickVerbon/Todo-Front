<template>
  <form @submit.prevent="login">
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username">
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password">
    </div>
    <button type="submit">Log in</button>
  </form>
  <p> {{ error_text }}</p>

</template>

<script>
import axios from 'axios';
import router from '../router/router.js'
export default {
  props: ["user"],
  data() {
    return {
      username: '',
      password: '',
      error_text: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api-token-auth/', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('todo_access_token', response.data.token);
        router.push({name: "todos"})
      } catch (error) {
        if(error.response.status !== 400) {
          this.error_text = error.response.statusText
        }
        else {
          this.error_text = "Username or password incorrect"
        }
      }
    },
    isAuthenticated() {
      if(localStorage.getItem('todo_access_token') !== null) {
        router.push({name: "todos"})
      }
    },
  },
  created() {
    this.isAuthenticated()
  }
};
</script>