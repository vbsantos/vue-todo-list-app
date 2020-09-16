<template>
  <header id="header">
    <h1 id="title">Todo-List</h1>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <img id="theme-toggle" @click="toggleTheme" src="../../../assets/theme-icon.svg" />
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
import Vue from "vue";
export default {
  name: "Header",
  methods: {
    async toggleTheme() {
      this.$store.dispatch("toggleColorTheme");
    },
  },
};
</script>

<style scoped>
#header {
  height: 80px;
  text-align: center;
  color: var(--color4);
  margin: 0;
  padding: 0;
  margin-top: 10px;
}
#header a {
  color: var(--color4);
  text-decoration: none;
}
#header a:hover {
  text-decoration: underline;
}
#title {
  height: 40px;
  line-height: 40px;
  font-size: 36px;
  margin: 0;
  padding: 0;
}
#nav {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  margin: 0;
  padding: 0;
  font-family: var(--font2);
}
.router-link-exact-active {
  font-weight: 800;
  cursor: default;
  text-decoration: none !important;
}
#theme-toggle {
  cursor: pointer;
  width: 14px;
  height: 14px;
  margin: 0 5px -1px;
  filter: var(--svg);
  opacity: 0.75;
}
</style>
