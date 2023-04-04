<template>
  <button @click="logout">Logout</button>
</template>
  
  <script>
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
      async logout() {
        try {
          localStorage.removeItem('todo_access_token');
          // Need a redirect to another page.
          router.push({name: "login"})
        } catch (error) {
          console.log(error)
        }
      },
    },
  };
  </script>