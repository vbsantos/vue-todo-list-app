<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// Import Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
:root {
  --color1: rgb(35, 41, 56);
  --color2: rgb(70, 207, 104);
  --color3: rgb(255, 85, 85);
  --color4: rgba(248, 248, 242, 0.749);
  --color5: rgba(248, 248, 242, 0.251);
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: var(--color1);
  margin: 0;
  padding: 0;
}
.neomorphic-btn {
  padding: 0;
  color: var(--color4);
  border: solid 1px transparent;
  border-radius: 10px;
  box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.5),
    -3px -3px 7px 0px rgba(255, 255, 255, 0.2);
  background-color: transparent;
}
.neomorphic-btn:focus {
  outline: none;
}
.neomorphic-btn:active {
  border: none;
  box-shadow: inset 3px 3px 7px 0px rgba(0, 0, 0, 0.5),
    inset -3px -3px 7px 0px rgba(255, 255, 255, 0.2);
  background-color: var(--color2);
}
.empty.neomorphic-btn:active {
  background-color: var(--color3);
}
#delete-btn.neomorphic-btn:active {
  background-color: var(--color3);
}
.neomorphic-btn-active {
  border: none;
  box-shadow: none;
  box-shadow: inset 3px 3px 7px 0px rgba(0, 0, 0, 0.7),
    inset -3px -3px 7px 0px rgba(255, 255, 255, 0.3);
  background-color: var(--color2);
}
</style>

<style scoped>
#app {
  max-width: 600px;
  padding: 0px 20px;
  margin: auto;
}
</style>
