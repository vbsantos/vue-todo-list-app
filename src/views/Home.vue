<template>
  <div id="home">
    <AddTodo />
    <Todos />
  </div>
</template>

<script>
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
export default {
  name: "Home",
  components: { AddTodo, Todos },
};
</script>
