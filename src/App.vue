<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
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
  --color1: #242a39;
  --color2: #395db8;
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