/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeClone from "@/store";
import ReviewCard from "@/components/reviews/ReviewCard";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Review Card Test", () => {
  let store;
  let wrapper;

  let review = {
    id: 1,
    date: 1633987676052,
    rate: 4,
    title: "Review Title",
    details: "lorem lorem lorem lorem lorem lorem lorem lorem",
    comments: [],
    user: {
      id: 1,
      name: "Mohamed Abd Elhafiz",
      image: `https://randomuser.me/api/portraits/men/5`,
    },
  };
  // clean the store and init data
  beforeEach(() => {
    store = storeClone;
    wrapper = shallowMount(ReviewCard, {
      store,
      localVue,
      propsData: {
        review,
        comment: "",
        activeReview: "",
        errorFeedback: false,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Test That Review Card Is Rendered Correctly", async () => {
    expect(wrapper.html()).toMatch(review.user.image);
    expect(wrapper.find(".card__heading").text()).toMatch(review.user.name);
    expect(wrapper.find(".card__date").text()).toMatch("11 Oct 2021");
    expect(wrapper.find(".card__title").text()).toMatch(review.title);
    expect(wrapper.find(".rate-value").text()).toMatch(`${review.rate}/5`);
    expect(wrapper.find(".dis-like").exists()).toBeFalsy();
    expect(wrapper.find(".card__details").text()).toMatch(review.details);
    // check that the review doesn't has comments
    expect(wrapper.find(".card__comments").exists()).toBeFalsy();
    // check that the comment form is not rendered
    expect(wrapper.find(".form").exists()).toBeFalsy();
    expect(wrapper.find(".show-form-btn").exists()).toBeTruthy();
  });

  it("Show comment form when clicking add comment btn & show validation message if the comment field is empty", async () => {
    wrapper.find(".show-form-btn").trigger("click");
    await wrapper.vm.$nextTick();
    let addCommentForm = wrapper.find(".form");
    expect(addCommentForm.exists()).toBeTruthy();
    addCommentForm.trigger("submit");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.errorFeedback).toBe(true);
    expect(wrapper.find(".text-danger").text()).toMatch(
      "This Field Is Required !"
    );
  });

  it("submit the form if the form is valid & update the store & reset the form and hide it", async () => {
    store.dispatch("addReview", review);
    expect(store.getters["getReviews"]).toHaveLength(1);
    // show comment form and set the comment value
    wrapper.find(".show-form-btn").trigger("click");
    let comment = "Comment Content";
    wrapper.setData({ comment: comment });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".form").exists()).toBeTruthy();
    expect(wrapper.vm.activeReview === review.id);

    // submit the form => store the result in the store and reset the form
    wrapper.find(".form").trigger("submit");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".form").exists()).toBeFalsy();
    expect(wrapper.vm.activeReview).toEqual("");
    expect(wrapper.vm.comment).toEqual("");
    expect(store.getters["getReviews"][0].comments).toHaveLength(1);
    expect(store.getters["getReviews"][0].comments[0].content).toEqual(comment);
  });

  it("format date successfully", () => {
    expect(wrapper.vm.formatDate(1633987676052)).toEqual("11 Oct 2021");
  });
});
