/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import Banner from "@/components/shared/Banner";

describe("Banner Test", () => {
  let wrapper;
  wrapper = shallowMount(Banner, {
    propsData: {
      headingText: "Banner Heading",
    },
    slots: {
      default: "Main Content",
    },
  });

  it("has a heading [string] text and default background image", () => {
    expect(typeof wrapper.vm.headingText).toBe("string");
    expect(wrapper.vm.backGroundUrl).toBeTruthy();
    expect(wrapper.find(".banner__heading").text()).toEqual(
      wrapper.vm.headingText
    );
  });

  it("render the slot", () => {
    expect(wrapper.html()).toContain("Main Content");
  });
});
