import Vue from "vue";
import App from "./App.vue";
import store from "./store";

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faStar, faThumbsUp);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// custom modal
import Modal from "@/custom-modal";
Vue.prototype.$modal = Modal;

// main style
import "./style/main.scss";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
