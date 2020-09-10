<template>
  <div id="addTodo">
    <input
      id="text-input"
      type="text"
      v-model="title"
      name="title"
      placeholder="Add Todo..."
      v-on:keydown.enter="addTodo"
    />
    <twemoji-picker
      :emojiData="emojiDataAll"
      :emojiGroups="emojiGroups"
      @emojiUnicodeAdded="emojiUnicodeAdded"
      :searchEmojisFeat="true"
      :pickerWidth="455"
      :pickerHeight="180"
    >
      <template v-slot:twemoji-picker-button>
        <button id="emoji-btn" class="neomorphic-btn">
          <img draggable="false" class="icon" src="../../assets/emoji-icon.png" />
        </button>
      </template>
    </twemoji-picker>
    <button
      id="submit-btn"
      @click="addTodo"
      v-bind:class="{ empty: title == '' }"
      class="neomorphic-btn"
    >ADD</button>
  </div>
</template>

<script>
import { TwemojiPicker } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json";
import EmojiDataAnimalsNature from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-group-animals-nature.json";
import EmojiDataFoodDrink from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-group-food-drink.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
export default {
  name: "AddTodo",
  components: {
    "twemoji-picker": TwemojiPicker,
  },
  data: () => {
    return {
      title: "",
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
    addTodo(e) {
      e.preventDefault();
      if (!this.title) return;

      this.$store.dispatch("addTodo", {
        id: new Date().toISOString(),
        title: this.title,
        completed: false,
      });

      this.title = "";
    },
    emojiUnicodeAdded(e) {
      const inputField = document.getElementById("text-input");
      const caretPosition = inputField.selectionStart;
      this.title =
        this.title.slice(0, caretPosition) +
        e +
        this.title.slice(caretPosition, this.title.length);
      inputField.click();
      inputField.focus();
    },
    emojiContainerOpened(e) {
      const emojiContainer = document.getElementById("popper-container");
      if (emojiContainer.style.inset !== "auto auto 0px 0px") return;
      const searchEmojiField = document.getElementById("search-header")
        .childNodes[2];
      searchEmojiField.focus();
    },
  },
  mounted() {
    const emojiButton = document.getElementById("popper-button");
    emojiButton.onclick = this.emojiContainerOpened;
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
}
#text-input::placeholder {
  color: var(--color5);
  opacity: 1;
}
#submit-btn {
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  min-width: 80px;
  margin-left: 40px;
  cursor: pointer;
}
#text-input:-webkit-autofill,
#text-input:-webkit-autofill:hover,
#text-input:-webkit-autofill:focus,
#text-input:-webkit-autofill:active {
  -webkit-box-shadow: inset 0 0 0 30px var(--color1);
}
#text-input:-webkit-autofill {
  -webkit-text-fill-color: var(--color4);
  caret-color: white;
}
#emoji-btn .icon {
  padding-top: 7px;
  width: 25px;
  height: 25px;
  filter: invert(100%);
  opacity: 0.7;
}
#emoji-btn {
  height: 40px;
  line-height: 40px;
  width: 40px;
  cursor: pointer;
}
</style>
