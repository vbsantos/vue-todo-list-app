<template>
  <div class="todo-item" v-bind:class="{ 'is-complete': todo.completed }">
    <p>
      <input v-model="checked" type="checkbox" @click="toggleTodo" />
      {{ todo.title }}
      <!-- <small>
        <i>{{JSON.stringify(todo)}}</i>
      </small>-->
      <!-- <button @click="$emit('del-todo', todo.id)" class="del">X</button> -->
      <button @click="deleteTodo" class="del">X</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  data: function() {
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
.todo-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
.is-complete {
  text-decoration: line-through;
}
.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
