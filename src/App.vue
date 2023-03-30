<template>
  <div id="app">
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
import router from './router/router'

export default {
  name: 'app',
  router,
  data() {
    return {
      user: null
    }
  }
}
</script>