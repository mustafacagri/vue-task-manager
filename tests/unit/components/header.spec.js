import Vuex from "vuex"
import { mount, createLocalVue } from "@vue/test-utils"
import App from "@/components/header.vue"

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		task:{
			namespaced: true,
			getters:{
				getTasks(state){
					return state.taskList
				}
			}
		}
	}
})

describe("App", () => {
  it("renders the header using a Vuex store", () => {
    const wrapper = mount(App, { 
      store, 
      localVue 
    })
    expect(wrapper.find(".btn-success").text()).toBe("Create a Task")
  })
})