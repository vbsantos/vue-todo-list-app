<template>
  <div id="addTodo">
    <form @submit="addTodo">
      <input id="text-input" type="text" v-model="title" name="title" placeholder="Add Todo..." />
      <input id="submit-btn" type="submit" value="ADD" class="neomorphic-btn" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    addTodo(e) {
      // prevent page refresh
      e.preventDefault();

      if (!this.title) return;

      //create todo object
      const newTodo = {
        id: new Date().toISOString(),
        title: this.title,
        completed: false,
      };

      // Send up to parent
      this.$emit("add-todo", newTodo);

      // clear input
      this.title = "";
    },
  },
};
</script>

<style scoped>
#addTodo {
  padding: 20px 0;
  height: 40px;
}
form {
  display: flex;
}
#text-input {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  width: 100%;
  border: 0px solid;
  background-color: transparent;
  color: var(--color3);
}
#text-input:focus {
  outline: none;
}
#text-input::placeholder {
  color: var(--color4);
  opacity: 10;
}
#submit-btn {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  width: 99px;
  margin-left: 10px;
}
</style>
