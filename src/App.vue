<template>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </head>
  
  <body>
    <div id="app">
      <router-view :user="user"></router-view>
    </div>
  </body>
</template>

<script>
import router from './router/router'

export default {
  name: 'app',
  router,
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    checkAuthentication() {
      return localStorage.getItem('todo_access_token') !== null;
    }
  },
}
</script>

<style>

body {
  background-color: #352f5b !important;
}

.container{
  max-width: 450px;
}

input[type=text],
input[type=text]:focus{
  color: #fff;
  border: none;
  background-color: rgba(0, 0, 0, .2);
}

li.list-group-item{
  background-color: #423a6f;
  color: #F8F9FA;
}

.delete{
  cursor: pointer;
}

label.add{
  margin-bottom: 15px;
}

.filtred{
  display: none !important;
}

.completed {
  color: lightgray;
  text-decoration: line-through;
}
</style>