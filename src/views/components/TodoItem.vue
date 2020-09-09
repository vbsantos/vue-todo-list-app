<template>
  <div id="todo-item">
    <button
      draggable="false"
      id="check-btn"
      class="neomorphic-btn"
      v-bind:class="{ 'neomorphic-btn-active': todo.completed }"
      @click="toggleTodo"
    >
      <img
        draggable="false"
        class="icon"
        v-bind:class="{ selected: todo.completed }"
        src="../../assets/check-icon.png"
      />
    </button>
    <p
      draggable="false"
      id="todo-title"
      v-bind:class="{ selected: todo.completed }"
    >{{ todo.title }}</p>
    <button draggable="false" id="delete-btn" class="neomorphic-btn" @click="deleteTodo">
      <img draggable="false" class="icon" src="../../assets/trash-icon.png" />
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    toggleTodo() {
      this.$store.dispatch("toggleTodo", this.todo);
    },
    deleteTodo() {
      this.$store.dispatch("deleteTodo", this.todo.id);
    },
  },
};
</script>

<style scoped>
#todo-item {
  display: flex;
  padding: 20px 20px;
  margin: 0;
  font-family: var(--font2);
  background-color: var(--color1);
  border-radius: 20px;
}
#check-btn {
  height: 40px;
  line-height: 40px;
  min-width: 40px;
  cursor: pointer;
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
  cursor: pointer;
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
