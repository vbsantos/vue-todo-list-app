<template>
  <div id="todo-item">
    <button
      id="check-btn"
      class="neomorphic-btn"
      v-bind:class="{ 'neomorphic-btn-active': todo.completed }"
      @click="toggleTodo"
    >
      <img
        class="icon"
        v-bind:class="{ 'selected': todo.completed }"
        src="../assets/check-icon.png"
      />
    </button>
    <p id="todo-title" v-bind:class="{ 'selected': todo.completed }">{{ todo.title }}</p>
    <button id="delete-btn" class="neomorphic-btn" @click="deleteTodo">
      <img class="icon" src="../assets/trash-icon.png" />
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  data: function () {
    return {
      checked: this.todo.completed,
    };
  },
  methods: {
    toggleTodo() {
      this.$emit("toggle-todo", this.todo);
    },
    deleteTodo() {
      this.$emit("del-todo", this.todo.id);
    },
  },
};
</script>

<style scoped>
#todo-item {
  display: flex;
  padding: 20px 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu Condensed, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
#check-btn {
  height: 40px;
  line-height: 40px;
  min-width: 40px;
}
#todo-title {
  color: var(--color4);
  min-height: 40px;
  width: calc(100% - 120px);
  line-height: 40px;
  font-size: 24px;
  padding: 0 20px;
  margin: 0;
  word-wrap: break-word;
}
#delete-btn {
  height: 40px;
  line-height: 40px;
  min-width: 40px;
}
.icon {
  padding-top: 7px;
  padding-left: 1px;
  width: 25px;
  height: 25px;
  filter: invert(100%);
}
#delete-btn .icon {
  opacity: 0.75;
}
#check-btn .icon {
  opacity: 0.25;
}
.selected {
  color: var(--color5) !important;
}
#check-btn .icon.selected {
  opacity: 1 !important;
}
</style>
