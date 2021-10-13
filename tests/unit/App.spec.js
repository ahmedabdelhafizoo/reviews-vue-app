import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Test App Component", () => {
  let actions = {
    loadReviews: jest.fn(),
  };
  let store = new Vuex.Store({
    actions,
  });

  it("dispatch loadReviews action once the componet is created", () => {
    const wrapper = shallowMount(App, { store, localVue });
    expect(actions.loadReviews).toHaveBeenCalled();
  });
});
