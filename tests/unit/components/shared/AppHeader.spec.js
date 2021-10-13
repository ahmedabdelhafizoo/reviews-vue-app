/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeClone from "@/store";
import AppHeader from "@/components/shared/AppHeader";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App Header Test", () => {
  let store;
  let wrapper;
  store = storeClone;
  wrapper = shallowMount(AppHeader, {
    store,
    localVue,
    propsData: {},
  });

  it("has a logo image and view auth user image and name", async () => {
    expect(wrapper.find(".header__logo img").exists()).toBeTruthy();
    let authUser = store.getters["getAuthUser"];
    expect(wrapper.find(".header__user").html()).toMatch(authUser.name);
    expect(wrapper.find(".header__user").html()).toMatch(authUser.image);
  });
});
