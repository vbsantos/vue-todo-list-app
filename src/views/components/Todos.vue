<template>
  <div id="todos">
    <SlickList
      v-if="todos.length > 0"
      helperClass="dragging"
      lockAxis="y"
      :distance="20"
      :value="todos"
      :transitionDuration="80"
      :draggedSettlingDuration="80"
      @sort-end="handleDrogEnd"
    >
      <slickItem v-for="(todo, index) in todos" v-bind:key="todo.id" v-bind:index="index">
        <TodoItem :id="'todo-item-'+todo.id" v-bind:todo="todo" />
      </slickItem>
    </SlickList>
    <div v-else id="message">
      <img src="@/assets/check-icon.png" />
      <p>Don't you have something to do?</p>
    </div>
  </div>
</template>

<script>
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
      return this.$store.getters.todos;
    },
  },
  methods: {
    handleDrogEnd(e) {
      const oldIndex = e.oldIndex;
      const newIndex = e.newIndex;
      if (oldIndex !== newIndex) {
        const reorderTodosFunc = () => {
          this.$store.dispatch("reorderTodos", [oldIndex, newIndex]);
        };
        reorderTodosFunc();

        this.$store.dispatch("addCommand", [
          reorderTodosFunc,
          () => {
            this.$store.dispatch("reorderTodos", [newIndex, oldIndex]);
          },
        ]);
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
  padding-top: calc(19vh);
  font-size: 18px;
  color: var(--color5);
}
#message img {
  width: 125px;
  height: 125px;
  filter: var(--svg);
  opacity: 0.25;
}
.dragging {
  border-radius: 20px;
  box-shadow: 2px 2px 4px 2px var(--dark-shadow);
  background-color: var(--color1);
}
</style>
