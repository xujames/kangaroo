__webpack_public_path__ = window.__webpack_public_path__;

import "core-js";

import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";
import VueScript2 from "scripts/lib/script2.js";
import VueLazyLoad from "vue-lazyload";
import Tooltip from "vue-directive-tooltip";
import VueMq from "vue-mq";
import { mapState } from "vuex";

import components from "./components";
import store from "./store";
import { ucfirst, upcase, unhandleize } from "./filters/string.js";
import { money, moneyWithoutDecimals } from "./filters/money.js";

import imageConfig from "scripts/config/images.js";

const cssVars = require("../styles/variables.scss");

Vue.config.productionTip = false;

Vue.use(Vue2TouchEvents);
Vue.use(VueScript2);
Vue.use(Tooltip, {
  class: 'tooltip-custom'
});

Vue.use(VueLazyLoad, {
  preload: 1.3,
  loading: imageConfig.loading,
  attempt: 1
});

Vue.use(VueMq, {
  breakpoints: {
    mobile: parseInt(cssVars.breakTablet, 10),
    tablet: parseInt(cssVars.breakDesktop, 10),
    desktop: parseInt(cssVars.breakHd, 10),
    hd: Infinity
  }
});

Vue.filter("ucfirst", ucfirst);
Vue.filter("upcase", upcase);
Vue.filter("unhandleize", unhandleize);
Vue.filter("money", money);
Vue.filter("moneyWithoutDecimals", moneyWithoutDecimals);

new Vue({
  store,
  components,
  comments: true,
  computed: {
    ...mapState({
      checkout: state => state.cart.checkout
    }),
    featuredProductSlidesToShow() {
      if (this.$mq === "mobile") return 1.8;
      if (this.$mq === "tablet") return 3;
      return 4;
    }
  },
  created() {
    this.$store.dispatch("cart/init");
    this.$store.dispatch("products/init");
  }
}).$mount("#app");
