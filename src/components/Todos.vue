<template>
  <div id="todos">
    <TodoItem v-for="todo in todos" v-bind:key="todo.id" v-bind:todo="todo" />
  </div>
</template>

<script>
// Import Components
import TodoItem from "./TodoItem";
export default {
  name: "Todos",
  components: {
    TodoItem,
  },
  data() {
    return this.$store.state;
  },
};
</script>

<style scoped>
#todos {
  min-height: calc(100vh - 229px);
}
</style>