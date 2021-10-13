/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeClone from "@/store";
import AddReviewModal from "@/components/reviews/AddReviewModal";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Add Review Test", () => {
  let store;
  let wrapper;

  // clean the store and init data
  beforeEach(() => {
    store = storeClone;
    wrapper = shallowMount(AddReviewModal, {
      store,
      localVue,
      propsData: {
        title: "",
        rate: 1,
        details: "",
        errorFeedback: null,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('does not add the review if the is an invalid input and show validation message"', async () => {
    const addReviewForm = wrapper.find(".form");
    addReviewForm.trigger("submit");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.errorFeedback).toEqual(true);
    expect(wrapper.find(".text-danger").html()).toMatch(
      "Please fill all fields first !"
    );
    // to make sure that the review not added to the store
    expect(store.getters["getReviews"]).toHaveLength(0);
  });

  it('reset form data successfully"', async () => {
    wrapper.setData({
      title: "title",
      rate: 5,
      details: "details",
      errorFeedback: true,
    });
    const resetBtn = wrapper.find(".modal__close-btn");
    resetBtn.trigger("click");

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.title).toBeFalsy();
    expect(wrapper.vm.rate).toEqual(1);
    expect(wrapper.vm.details).toBeFalsy();
    expect(wrapper.vm.errorFeedback).toBeFalsy();
  });

  it('add review to the store successfully if the inputs is valid"', async () => {
    let review = {
      title: "title",
      rate: 3,
      details: "details",
    };
    wrapper.setData({
      ...review,
    });

    const addReviewForm = wrapper.find(".form");
    addReviewForm.trigger("submit");

    let storeReviews = store.getters["getReviews"];
    expect(storeReviews).toHaveLength(1);
    expect(
      storeReviews.find(
        (item) =>
          item.title === review.title &&
          item.rate === review.rate &&
          item.details === review.details
      )
    ).toBeTruthy();
  });
});
