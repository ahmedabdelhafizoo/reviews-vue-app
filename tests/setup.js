import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faStar, faThumbsUp);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import { RatingStars } from "@/components/shared/RatingStars";
Vue.component("RatingStars", RatingStars);
