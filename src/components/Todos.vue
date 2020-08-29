<template>
  <div>
    <div v-bind:key="todo.id" v-for="todo in todos">
      <TodoItem
        v-bind:todo="todo"
        v-on:del-todo="$emit('del-todo', todo.id)"
        v-on:toggle-todo="$emit('toggle-todo', todo)"
      />
    </div>
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
  props: ["todos"],
};
</script>
