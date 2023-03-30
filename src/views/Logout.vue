<template>
</template>
  
  <script>
  import axios from 'axios';
  import router from '../router/router.js'
  export default {
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
          // Need a redirect to another page.
          router.push({name: "todos"})
        } catch (error) {
          if(error.response.status !== 400) {
            this.error_text = error.response.statusText
          }
          else {
            this.error_text = "Username or password not correct"
          }
        }
      },
    },
  };
  </script>