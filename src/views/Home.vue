<template>
  <div id="home">
    <AddTodo />
    <Todos />
  </div>
</template>

<script>
// Import Components
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";
export default {
  name: "Home",
  components: { AddTodo, Todos },
  created() {
    this.$store.dispatch("loadTodos");
  },
};
</script>
