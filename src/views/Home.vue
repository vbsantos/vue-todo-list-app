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
    return this.$store.state;
  },
  methods: {
    toggleTodo(todo) {
      this.$store.dispatch("toggleTodo", todo);
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    addTodo(todo) {
      this.$store.dispatch("addTodo", todo);
    },
  },
  created() {
    this.$store.dispatch("loadTodos");
  },
};
</script>
