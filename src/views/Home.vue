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
      this.todos.find(
        (todo) => todo.id === todoItem.id
      ).completed = !todoItem.completed;
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    addTodo(todo) {
      this.todos = [...this.todos, todo];
    },
  },
};
</script>
