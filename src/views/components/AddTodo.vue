<template>
  <div id="addTodo">
    <input
      autocomplete="off"
      spellcheck="false"
      id="text-input"
      type="text"
      v-model="title"
      name="title"
      placeholder="Add Todo..."
      v-on:keydown.enter="addTodo"
    />
    <button
      id="submit-btn"
      @click="addTodo"
      v-bind:class="{ empty: title == '' }"
      class="neomorphic-btn"
    >
      ADD
    </button>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data: () => {
    return {
      title: "",
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();
      if (!this.title) return;
      const todo_id = new Date().toISOString();
      const todo_title = this.title;
      const todo_completed = false;

      const addTodoFunc = () => {
        this.$store.dispatch("addTodo", {
          id: todo_id,
          title: todo_title,
          completed: todo_completed,
        });
      };
      addTodoFunc();

      this.$store.dispatch("addCommand", [
        addTodoFunc,
        () => {
          this.$store.dispatch("deleteTodo", todo_id);
        },
      ]);

      this.title = "";
    },
  },
};
</script>

<style scoped>
#addTodo {
  padding: 20px 20px;
  height: 40px;
  display: flex;
}
#text-input {
  user-select: text;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  width: 100%;
  min-width: 10px;
  border: 0px;
  background-color: transparent;
  color: var(--color4);
}
#text-input:focus {
  outline: none;
  background-color: var(--color6);
  border-radius: 10px;
  padding: 0 20px;
}
#text-input::placeholder {
  color: var(--color5);
  opacity: 1;
}
#text-input:focus::placeholder {
  opacity: 0;
}
#submit-btn {
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  min-width: 100px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
