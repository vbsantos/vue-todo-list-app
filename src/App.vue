<template>
  <div id="app">
    <Header />
    <AddTodo v-on:add-todo="addTodo" />
    <Todos
      v-bind:todos="todos"
      v-on:del-todo="deleteTodo"
      v-on:toggle-todo="toggleTodo"
    />
  </div>
</template>

<script>
// Import Libs
import Axios from "axios";
// Import Components
import Todos from "./components/Todos";
import Header from "./components/Layout/Header";
import AddTodo from "./components/AddTodo";
export default {
  name: "App",
  components: { Header, AddTodo, Todos },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    toggleTodo(todo) {
      Axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      })
        .then(
          (res) =>
            (this.todos.find((el) => el.id === todo.id).completed =
              res.data.completed)
        )
        .catch((error) => console.error(error));
    },
    deleteTodo(id) {
      Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => (this.todos = this.todos.filter((todo) => todo.id !== id)))
        .catch((error) => console.error(error));
    },
    addTodo(todo) {
      Axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: todo.title,
        completed: todo.completed,
      })
        .then((res) => (this.todos = [...this.todos, res.data]))
        .catch((error) => console.error(error));
    },
  },
  created() {
    Axios.get("https://jsonplaceholder.typicode.com/todos?_limit=8")
      .then((res) => (this.todos = res.data))
      .catch((error) => console.error(error));
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
</style>
