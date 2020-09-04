<template>
  <div id="todos">
    <TodoItem
      draggable="true"
      @dragstart="dragstart"
      @drop="drop"
      @dragover="dragover"
      v-for="(todo, index) in todos"
      v-bind:index="index"
      v-bind:key="todo.id"
      v-bind:todo="todo"
    />
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
  computed: {
    todos: function() {
      return this.$store.state.todos;
    },
  },
  methods: {
    dragstart(e) {
      try {
        const todo_id = e.target.attributes["index"].value;
        this.$store.dispatch("dragTodo", todo_id);
      } catch (error) {
        return;
      }
    },
    drop(e) {
      try {
        e.preventDefault();
        let todo_element = e.target;
        while (!todo_element.attributes["index"]) {
          todo_element = todo_element.parentElement;
        }
        const todo_id = todo_element.attributes["index"].value;
        this.$store.dispatch("dropTodo", todo_id);
      } catch (error) {
        return;
      }
    },
    dragover(e) {
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
#todos {
  min-height: calc(100vh - 229px);
}
</style>
