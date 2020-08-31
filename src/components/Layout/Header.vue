<template>
  <header id="header">
    <h1 id="title">Todo-List</h1>
    <div id="nav">
      <router-link to="/">{{ "Home" }}</router-link>
      {{ " | " }}
      <router-link to="/about">{{ "About" }}</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
#header {
  /* border: 1px red solid; */
  height: 80px;
  text-align: center;
  color: var(--color3);
  margin: 0;
  padding: 0;
  margin-top: 10px;
}
#header a {
  color: var(--color3);
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
}
.router-link-active {
  font-weight: 800;
  cursor: default;
  text-decoration: none !important;
}
</style>
