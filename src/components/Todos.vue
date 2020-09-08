<template>
  <div id="todos">
    <SlickList
      helperClass="dragging"
      lockAxis="y"
      :distance="20"
      :value="todos"
      :transitionDuration="80"
      :draggedSettlingDuration="80"
      @sort-end="handleDrogEnd"
    >
      <slickItem v-for="(todo, index) in todos" v-bind:key="todo.id" v-bind:index="index">
        <TodoItem v-bind:todo="todo" />
      </slickItem>
    </SlickList>
    <div id="message" v-bind:class="{ hidden: todos.length > 0 }">Don't you have something to do?</div>
  </div>
</template>

<script>
// Import Components
import { SlickList, SlickItem } from "vue-slicksort";

import TodoItem from "./TodoItem";
export default {
  name: "Todos",
  components: {
    TodoItem,
    SlickList,
    SlickItem,
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },
  methods: {
    handleDrogEnd(e) {
      if (e.oldIndex !== e.newIndex) {
        this.$store.dispatch("reorderTodos", [e.oldIndex, e.newIndex]);
      }
    },
  },
};
</script>

<style scoped>
#todos {
  min-height: calc(100vh - 229px);
}
#message {
  text-align: center;
  padding-top: 20vh;
  font-size: 18px;
  color: var(--color5);
}
.hidden {
  display: none;
}
.dragging {
  border-radius: 20px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.5);
  rotate: 2deg !important;
}
</style>
