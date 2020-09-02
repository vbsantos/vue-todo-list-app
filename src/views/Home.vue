<template>
  <div id="home">
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" v-on:toggle-todo="toggleTodo" />
  </div>
</template>

<script>
// Import Components
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";
import Storage from "../functions/storage.js";
export default {
  name: "Home",
  components: { AddTodo, Todos },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    toggleTodo(todoItem) {
      this.todos = Storage.toggleTodo(todoItem);
    },
    deleteTodo(id) {
      this.todos = Storage.deleteTodo(id);
    },
    addTodo(todo) {
      this.todos = Storage.addTodo(todo);
    },
  },
  created() {
    this.todos = Storage.loadTodos();
  },
};
</script>
