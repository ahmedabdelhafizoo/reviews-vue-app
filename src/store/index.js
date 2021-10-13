import Vue from "vue";
import Vuex from "vuex";
import { generateUID, getRandomInt } from "@/helpers";

Vue.use(Vuex);
let storeConfig = {
  state: {
    authUser: {
      id: "1234",
      name: "Ahmed Mohamed",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    reviews: [],
  },
  getters: {
    getAuthUser(state) {
      return state.authUser;
    },
    getReviews(state) {
      return state.reviews.sort((a, b) => b.date - a.date);
    },
  },
  mutations: {
    setReviews(state, payload) {
      state.reviews = payload;
    },
    addComment(state, payload) {
      let comment = {
        id: generateUID(),
        content: payload.comment,
        user: state.authUser,
      };
      if (state.reviews.length === 1) {
        state.reviews[0].comments.push(comment);
      } else {
        let targetReview = state.reviews.find(
          (review) => review.id == payload.reviewId
        );
        targetReview.comments.push(comment);
      }
    },
    addReview(state, payload) {
      let review = {
        ...payload,
        id: generateUID(),
        date: new Date().getTime(),
        comments: [],
        user: state.authUser,
      };
      state.reviews.push(review);
    },
  },
  actions: {
    loadReviews({ commit }) {
      let reviews = JSON.parse(localStorage.getItem("reviews")) || [
        {
          id: generateUID(),
          date: 1633987676052,
          rate: 4,
          title: "Review Title",
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex excepturi voluptatum, mollitia dignissimos quaerat sint qui nesciunt quidem quasi! Eius officiis dolor cumque, hic harum iusto accusamus laudantium nam.",
          user: {
            id: generateUID(),
            name: "Mohamed Abd Elhafiz",
            image: `https://randomuser.me/api/portraits/men/${getRandomInt(
              0,
              99
            )}.jpg`,
          },
          comments: [
            {
              id: generateUID(),
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex excepturi voluptatum, mollitia dignissimos quaerat sint qui nesciunt quidem quasi! Eius officiis dolor cumque, hic harum iusto accusamus laudantium nam.",
              user: {
                id: generateUID(),
                image: `https://randomuser.me/api/portraits/men/${getRandomInt(
                  0,
                  99
                )}.jpg`,
              },
            },
          ],
        },
      ];
      commit("setReviews", reviews);
    },
    addComment({ commit, state }, payload) {
      commit("addComment", payload);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
    addReview({ commit, state }, payload) {
      return new Promise((resolve) => {
        commit("addReview", payload);
        localStorage.setItem("reviews", JSON.stringify(state.reviews));
        resolve();
      });
    },
  },
};

export let storeClone = new Vuex.Store(JSON.parse(JSON.stringify(storeConfig)));
export default new Vuex.Store(storeConfig);
