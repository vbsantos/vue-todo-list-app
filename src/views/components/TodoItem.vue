<template>
  <div class="todo-item">
    <!-- button in the left -->
    <button
      :id="'check-btn-' + todo.id"
      draggable="false"
      class="check-btn neomorphic-btn"
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
    <button
      v-if="editMode"
      :id="'edit-btn-' + todo.id"
      draggable="false"
      class="edit-btn neomorphic-btn"
      @click="editTodo"
    >
      <img draggable="false" class="icon" src="../../assets/edit-icon.png" />
    </button>

    <!-- todo title and edit input -->
    <p
      v-if="!editMode"
      class="todo-title"
      :id="'todo-title-'+todo.id"
      @dblclick="(e) => setEditMode(e, true)"
      draggable="false"
      v-bind:class="{ selected: todo.completed }"
    >{{ todo.title }}</p>
    <input
      class="todo-title-edit"
      :id="'todo-title-edit-'+todo.id"
      type="text"
      v-model="editTitle"
      @keydown.enter="editTodo"
    />

    <!-- buttons in the right -->
    <twemoji-picker
      v-if="editMode"
      :emojiData="emojiDataAll"
      :emojiGroups="emojiGroups"
      @emojiUnicodeAdded="emojiUnicodeAdded"
      :searchEmojisFeat="false"
      :pickerWidth="455"
      :pickerHeight="180"
    >
      <template v-slot:twemoji-picker-button>
        <button :id="'emoji-btn-' + todo.id" class="emoji-btn neomorphic-btn">
          <img draggable="false" class="icon" src="../../assets/emoji-icon.png" />
        </button>
      </template>
    </twemoji-picker>

    <button
      draggable="false"
      :id="'delete-btn-' + todo.id"
      class="delete-btn neomorphic-btn"
      @click="deleteTodo"
    >
      <img draggable="false" class="icon" src="../../assets/trash-icon.png" />
    </button>
  </div>
</template>

<script>
import { TwemojiPicker } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json";
import EmojiDataAnimalsNature from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-group-animals-nature.json";
import EmojiDataFoodDrink from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-group-food-drink.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
import Vue from "vue";
export default {
  name: "TodoItem",
  components: {
    "twemoji-picker": TwemojiPicker,
  },
  props: ["todo"],
  data() {
    return {
      editMode: false,
      editInput: null,
      editTitle: this.todo.title,
    };
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData.filter((emoji) => emoji.group !== 2);
    },
    emojiGroups() {
      return EmojiGroups.filter((emoji) => emoji.group !== 2);
    },
  },
  methods: {
    toggleTodo() {
      this.$store.dispatch("editTodo", {
        id: this.todo.id,
        completed: !this.todo.completed,
      });
    },
    deleteTodo() {
      this.$store.dispatch("deleteTodo", this.todo.id);
    },
    setEditMode(e, active) {
      this.editMode = active;
      this.editInput = document.getElementById(
        "todo-title-edit-" + this.todo.id
      );
      this.editInput.style.display = "flex";

      Vue.nextTick(() => {
        this.editInput.focus();
      });

      Vue.nextTick(() => {
        const emojiButton = document.getElementById(
          "emoji-btn-" + this.todo.id
        );
        emojiButton.onclick = this.emojiContainerOpened;
      });

      this.editInput.addEventListener("focusout", (event) => {
        const clickTarget = event.relatedTarget;
        if (clickTarget) {
          if (
            clickTarget.id === "emoji-btn-" + this.todo.id ||
            clickTarget.id === "edit-btn-" + this.todo.id
          )
            return;
          if (clickTarget.id === "check-btn-" + this.todo.id) {
            this.editTodo();
            return;
          }
        }
        this.editMode = false;
        this.editTitle = this.todo.title;
        this.editInput.style.display = "none";
      });
    },
    editTodo() {
      this.editMode = false;
      this.editInput.style.display = "none";
      if (this.editInput.value != "") {
        this.$store.dispatch("editTodo", {
          id: this.todo.id,
          title: this.editInput.value,
        });
      } else {
        this.deleteTodo();
      }
    },
    emojiUnicodeAdded(e) {
      const inputField = document.getElementById(
        `todo-title-edit-${this.todo.id}`
      );
      const caretPosition = inputField.selectionStart;
      this.editTitle =
        this.editTitle.slice(0, caretPosition) +
        e +
        this.editTitle.slice(caretPosition, this.editTitle.length);
      inputField.click();
      inputField.focus();
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
  background-color: var(--color1);
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
.todo-title-edit {
  display: none;
  color: var(--color4);
  font-family: var(--font2);
  background-color: var(--color6);
  min-height: 40px;
  width: calc(100% - 200px);
  line-height: 40px;
  font-size: 18px;
  padding: 0 20px;
  margin: 0 20px;
  border: 0;
  border-radius: 10px;
  user-select: text;
}
.todo-title-edit:focus {
  outline: none;
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
  opacity: 1 !important;
}
</style>
