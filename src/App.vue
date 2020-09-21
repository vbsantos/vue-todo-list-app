<template>
  <div id="app">
    <GlobalEvents @keydown.ctrl.z="undoCommand" @keydown.ctrl.y="redoCommand"></GlobalEvents>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./views/components/Layout/Header";
import Footer from "./views/components/Layout/Footer";
import GlobalEvents from "vue-global-events";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    GlobalEvents,
  },
  created() {
    this.$store.dispatch("loadTodos");
    this.$store.dispatch("getColorTheme");
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    theme() {
      return this.$store.getters.theme;
    },
  },
  watch: {
    theme() {
      const appElement = document.getElementsByTagName("HTML")[0];
      this.transition(appElement);
      appElement.setAttribute("theme-colors", this.theme);
    },
    loading() {
      const appElement = document.getElementsByTagName("HTML")[0];
      appElement.className = this.loading ? "loading" : "";
    },
  },
  methods: {
    async transition(element) {
      element.classList.add("transition");
      window.setTimeout(() => {
        element.classList.remove("transition");
      }, 300);
    },
    undoCommand(e) {
      e.preventDefault();
      this.$store.dispatch("undoCommand");
    },
    redoCommand(e) {
      e.preventDefault();
      this.$store.dispatch("redoCommand");
    },
  },
};
</script>

<style>
:root {
  --font1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --font2: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu Condensed, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
html[theme-colors="default"] {
  --color1: rgb(35, 41, 56);
  --color2: rgb(70, 207, 104);
  --color3: rgb(255, 85, 85);
  --color4: rgb(248, 248, 242, 0.75);
  --color5: rgb(248, 248, 242, 0.25);
  --color6: rgb(248, 248, 242, 0.05);
  --light-shadow: rgba(194, 211, 255, 0.2);
  --dark-shadow: rgba(0, 12, 43, 0.6);
  --svg: invert(100%);
  --check: 0.9;
}
html[theme-colors="light"] {
  --color1: rgb(189, 208, 255);
  --color2: rgb(100, 255, 75);
  --color3: rgb(255, 75, 100);
  --color4: rgba(0, 10, 30, 0.75);
  --color5: rgb(0, 10, 30, 0.25);
  --color6: rgb(0, 10, 30, 0.05);
  --light-shadow: rgba(241, 228, 255, 0.6);
  --dark-shadow: rgba(0, 4, 60, 0.25);
  --svg: invert(25%) sepia(90%) saturate(1350%) hue-rotate(200deg)
    brightness(30%);
  --check: 0.7;
}
html.transition,
html.transition *,
html.transition *:before,
html.transition *:after {
  transition: background-color 250ms ease !important ;
  -webkit-transition: background-color 250ms ease !important ;
  -moz-transition: background-color 250ms ease !important ;
  -o-transition: background-color 250ms ease !important ;
  -ms-transition: background-color 250ms ease !important ;
}
body {
  font-family: var(--font1);
  background-color: var(--color1);
  margin: 0;
  padding: 0;
}
body * {
  user-select: none;
}
.loading * {
  cursor: wait !important;
}
.neomorphic-btn {
  padding: 0;
  color: var(--color4);
  border: solid 1px transparent;
  border-radius: 10px;
  box-shadow: 3px 3px 4px 0px var(--dark-shadow),
    -3px -3px 4px 0px var(--light-shadow);
  background-color: transparent;
}
.neomorphic-btn:focus {
  outline: none;
}
.neomorphic-btn:active {
  border: none;
  box-shadow: inset 3px 3px 4px 0px var(--dark-shadow),
    inset -3px -3px 4px 0px var(--light-shadow);
  background-color: var(--color2);
}
.empty.neomorphic-btn:active {
  background-color: var(--color3);
}
.delete-btn.neomorphic-btn:active {
  background-color: var(--color3);
}
.neomorphic-btn-active {
  border: none;
  box-shadow: none;
  box-shadow: inset 3px 3px 4px 0px var(--dark-shadow),
    inset -3px -3px 4px 0px var(--light-shadow);
  background-color: var(--color2);
}
</style>

<style scoped>
#app {
  max-width: 640px;
  padding: 0px 5px;
  margin: 0 auto;
}
</style>
