<template>
  <div class="todo-item">
    <button
      draggable="false"
      class="check-btn neomorphic-btn"
      v-bind:class="{ 'neomorphic-btn-active': todo.completed }"
      @click="toggleTodo"
    >
      <img
        draggable="false"
        class="icon"
        v-bind:class="{ selected: todo.completed }"
        src="@/assets/check-icon.png"
      />
    </button>
    <p
      v-if="!editMode"
      class="todo-title"
      @dblclick="$store.dispatch('startEditMode', todo.id)"
      draggable="false"
      v-bind:class="{ selected: todo.completed }"
    >
      {{ todo.title }}
    </p>
    <textarea
      @keydown.enter="editTitle"
      @keydown.esc="cancelEditTitle"
      @blur="cancelEditTitle"
      @keyup="resizeInput"
      @keypress="resizeInput"
      spellcheck="false"
      v-else
      class="edit-todo-title"
      :value="todo.title"
    />

    <button
      draggable="false"
      class="delete-btn neomorphic-btn"
      @click="deleteTodo"
    >
      <img draggable="false" class="icon" src="@/assets/trash-icon.png" />
    </button>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "TodoItem",
  props: ["todo"],
  computed: {
    editMode() {
      return this.$store.getters.editing === this.todo.id;
    },
  },
  watch: {
    editMode() {
      if (this.editMode) {
        Vue.nextTick(() => {
          this.resizeInput();
        });
      }
    },
  },
  methods: {
    resizeInput() {
      const field = document.getElementsByClassName("edit-todo-title")[0];
      field.style.height = "40px";
      field.style.height = `${field.scrollHeight}px`;
      field.focus();
    },
    toggleTodo() {
      const todo_id = this.todo.id;
      const todo_completed = this.todo.completed;

      const toggleTodoFunc = () => {
        this.$store.dispatch("editTodo", {
          id: todo_id,
          completed: !todo_completed,
        });
      };
      toggleTodoFunc();

      this.$store.dispatch("addCommand", [
        toggleTodoFunc,
        () => {
          this.$store.dispatch("editTodo", {
            id: todo_id,
            completed: todo_completed,
          });
        },
      ]);
    },
    deleteTodo() {
      const todo_id = this.todo.id;
      const todo_completed = this.todo.completed;
      const todo_title = this.todo.title;

      const deleteTodoFunc = () => {
        this.$store.dispatch("deleteTodo", todo_id);
      };
      deleteTodoFunc();

      this.$store.dispatch("addCommand", [
        deleteTodoFunc,
        () => {
          this.$store.dispatch("addTodo", {
            id: todo_id,
            title: todo_title,
            completed: todo_completed,
          });
        },
      ]);
    },
    editTitle() {
      const todo_id = this.todo.id;
      const todo_old_title = this.todo.title;
      const todo_new_title = document.getElementsByClassName(
        "edit-todo-title"
      )[0].value;

      if (todo_new_title !== todo_old_title) {
        const editTitleTodoFunc = () => {
          this.$store.dispatch("editTodo", {
            id: todo_id,
            title: todo_new_title,
          });
        };
        editTitleTodoFunc();

        this.$store.dispatch("addCommand", [
          editTitleTodoFunc,
          () => {
            this.$store.dispatch("editTodo", {
              id: todo_id,
              title: todo_old_title,
            });
          },
        ]);
      }
      this.$store.dispatch("stopEditMode");
    },
    cancelEditTitle() {
      this.$store.dispatch("stopEditMode");
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  padding: 20px 20px;
  margin: 0;
  font-family: var(--font2);
  border-radius: 20px;
}
.todo-title {
  color: var(--color4);
  min-height: 40px;
  width: calc(100% - 120px);
  line-height: 40px;
  font-size: 24px;
  padding: 0 20px;
  margin: 0;
  word-wrap: break-word;
}
.edit-todo-title {
  overflow: hidden;
  outline: none;
  background-color: var(--color6);
  border: none;
  border-radius: 10px;
  resize: none;
  font-family: var(--font2);
  font-size: 24px;
  color: var(--color4);
  width: calc(100% - 120px);
  padding: 0 10px;
  margin: 0 10px;
  line-height: 40px;
}
.check-btn {
  margin-top: auto;
  margin-bottom: auto;
  height: 40px;
  line-height: 40px;
  min-width: 40px;
  cursor: pointer;
}
.delete-btn {
  height: 40px;
  line-height: 40px;
  min-width: 40px;
  cursor: pointer;
  margin: auto 0 auto 0;
}
.edit-btn {
  height: 40px;
  line-height: 40px;
  min-width: 40px;
  cursor: pointer;
  margin: auto 0 auto 20px;
}
.emoji-btn {
  margin-top: auto;
  margin-bottom: auto;
  height: 40px;
  line-height: 40px;
  width: 40px;
  cursor: pointer;
  margin: auto 20px auto 0;
}

.emoji-btn .icon {
  padding-top: 7px;
  width: 25px;
  height: 25px;
  opacity: 0.65;
}
.delete-btn .icon {
  opacity: 0.75;
}
.edit-btn .icon {
  opacity: 0.65;
}
.check-btn .icon {
  opacity: 0.25;
}
.selected {
  color: var(--color5) !important;
}
.icon {
  padding-top: 7px;
  padding-left: 1px;
  width: 25px;
  height: 25px;
  filter: var(--svg);
}
.check-btn .icon.selected {
  opacity: var(--check) !important;
}
</style>
