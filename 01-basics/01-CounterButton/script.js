import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',

  data() {
    return {
      count: 0,
    };
  },

  methods: {
    onClick() {
      this.count += 1;
    },
  },
});

window.app = app;
