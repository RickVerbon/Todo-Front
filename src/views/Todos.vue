<template>
  <div class="container">

  <!--  HEADER  -->
    <header class="text-center text-light my-4">
      <h1 class="mb-4">Todo List</h1>
    
    </header>
    
  <!--  LIST  -->
    <ul class="list-group todos mx-auto text-light">
      <li v-for="todo in todos" :key="todo.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span :class="{'completed': todo.completed}" @click="markAsDone(todo.id)">{{todo.todo_text}}</span>
          <i @click="removeTodo(todo.id)" class="far fa-trash-alt delete"></i>
      </li>
    </ul>
    
  <!--  FORM  -->
    <form @submit.prevent="addTodo" class="add text-center my-4">
      <label for="add" class="add text-light">Add a new todo:</label>
      <input type="text" v-model="todo" class="form-control m-auto" name="add" id="add">
    </form>
    
  </div>

</template>

<style>

</style>

<script>
import axios from 'axios';
import router from '../router/router.js'
export default {
  props: ["user"],
  data() {
    return {
      todos: [],
      todo: "",
      url_api: "http://localhost:8000/api/",
      completed: false,
      current_todo: {}
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
        const response = await axios.get(this.url_api, 
          {headers: {Authorization: `Token ${token}` }
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
      }
    },

    async markAsDone(todoId) {
      if(!this.isAuthenticated) {
        router.push({name: "login"})
        return
      }
      await this.getTodoDetail(todoId)

      try {
        this.completed = !this.completed
        const token = localStorage.getItem('todo_access_token');
        const response = await axios.put(`${this.getTodoId(todoId)}update`, {
          todo_text: this.current_todo.todo_text,
          completed: this.completed
        }, {
          headers: { Authorization: `Token ${token}` }
        });
        this.getData()
       } catch (error) {
          console.error(error);
       }
    },

    async getTodoDetail(todoId) {
      if(!this.isAuthenticated) {
        router.push({name: "login"})
      return
      }
      try {
        const token = localStorage.getItem('todo_access_token');
        const response = await axios.get(`${this.getTodoId(todoId)}detail`, {
            headers: { Authorization: `Token ${token}` }    
        });
        this.current_todo = await response.data
      } catch(error) {
        console.error(error)
      }
    }

  },
  created() {
    this.getData();
  }
}
</script>
