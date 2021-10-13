/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import RatingStars from "@/components/shared/RatingStars";

describe("RatingStars Test", () => {
  let wrapper;

  // clean the store and init data
  beforeEach(() => {
    wrapper = shallowMount(RatingStars, {
      propsData: {
        id: "test",
        ratingValue: 4,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("it view correct rating based on ratingValue prop & by default disabled [read only]", async () => {
    // should has id & by default it disabled[read only]
    expect(wrapper.vm.id).toBeTruthy();
    expect(wrapper.vm.viewOnly).toBeTruthy();

    let checkInput = wrapper.find("input:checked");
    expect(Number(checkInput.element.value)).toEqual(wrapper.vm.ratingValue);
    expect(wrapper.find(".rating-container").element.className).toContain(
      "view-only"
    );
    expect(wrapper.findAll("input:disabled").length).toEqual(5);
  });

  it("emit updateRating event once the rate changes", async () => {
    let rating = 5;
    wrapper.setData({ rating });
    wrapper.setProps({ viewOnly: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().updateRating).toBeTruthy();
  });
});
