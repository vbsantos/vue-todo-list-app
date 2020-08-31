<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Layout/Header";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
:root {
  --color1: #242a39;
  --color2: #eb5757;
  --color3: rgba(242, 242, 242, 0.75);
  --color4: rgba(242, 242, 242, 0.25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
body {
  background-color: var(--color1);
  margin: 0;
  padding: 0;
}
.neomorphic-btn {
  padding: 0;
  color: var(--color3);
  border: solid 1px var(--color1);
  border-radius: 10px;
  box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 0.5),
    -4px -4px 6px 0px rgba(255, 255, 255, 0.2);
  background-color: var(--color1);
}
.neomorphic-btn:active {
  box-shadow: inset 4px 4px 6px 0px rgba(0, 0, 0, 0.5),
    inset -4px -4px 6px 0px rgba(255, 255, 255, 0.2);
  background-color: var(--color2);
}
.neomorphic-btn-active {
  box-shadow: none;
  box-shadow: inset 4px 4px 6px 0px rgba(0, 0, 0, 0.5),
    inset -4px -4px 6px 0px rgba(255, 255, 255, 0.2);
  background-color: var(--color2);
}
</style>

<style scoped>
#app {
  max-width: 600px;
  margin: auto;
}
</style>