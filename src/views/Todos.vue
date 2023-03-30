

<template>
  <body>
    <div>
      <h1>To-do List</h1>
      <div>
        <form @submit.prevent="addTodo">
          <input type="text" v-model="todo" placeholder="Enter a ToDo..."  />
          <button>+</button>
        </form>
      </div>
      <div>
        <div v-for="todo in todos" :key="todo.id">
          <span>{{ todo.todo_text }} <button type="submit" @click="removeTodo(todo.id)">  X</button></span> 
        </div>
      </div>
    </div>
  </body>

</template>


<script>
import axios from 'axios';
import router from '../router/router.js'
export default {
  props: ["user"],
  data() {
    return {
      todos: [],
      todo: "",
      url_api: "http://localhost:8000/api/"
    }
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem('todo_access_token') !== null;
    }
  },
  methods: {
    async getData() {
      if(!this.isAuthenticated) {
        router.push({name: 'login'})
        return
      }
      try {
        const token = localStorage.getItem('todo_access_token');
        const response = await axios.get(this.url_api, {headers: {Authorization: `Token ${token}` }
      });
      this.todos = response.data
      } catch (error) {
        console.error(error);
      }
    },
    
    async addTodo() {
    try {
      const token = localStorage.getItem('todo_access_token');
      const response = await axios.post(`${this.url_api}`, {
        todo_text: this.todo
      }, {
        headers: { Authorization: `Token ${token}` }
      });
      this.todos.push(response.data);
      this.todo = "";
    } catch (error) {
        console.error(error);
      }
    },

    getTodoId(todoId) {
      const url = `${this.url_api}${todoId}/`
      return url
      
    },

    async removeTodo(todoId) {
      if(!this.isAuthenticated) {
        router.push({name: "login"})
        return
      }

      try {
        const token = localStorage.getItem('todo_access_token');
        const response = await axios.delete(`${this.getTodoId(todoId)}delete`, {
          headers: {Authorization: `Token ${token}`}
        });
        this.getData();
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getData();
  }
}
</script>
