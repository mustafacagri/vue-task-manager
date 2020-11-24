import Vuex from "vuex"
import { mount, createLocalVue, shallowMount } from "@vue/test-utils"
import TaskList from "@/components/TaskList.vue"

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		all:{
			namespaced: true,
			state: {
				definedValues: {
					maxTaskDescription: 100,
					maxSubtaskLength: 4,
					pagingSizes: [2,5,10,25,50]
				},
				states: [{id:0, name:"Closed"}, {id:1, name:"Open"},],
				levels: [
					{id:0, name:"Low"},
					{id:1, name:"High"},
					{id:2, name:"Critical"},
					{id:3, name:"Blocker"},
                ],
                taskList: [{"id":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","name":"Parent 1","levelId":3,"description":"Parent 1 Description","state":1,"subTasks":[{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"c71c9c8f-c12e-4a4a-b963-6179b6a6cc68","name":"Child 1","levelId":3,"description":"Child 1 Description","state":1,"level":"Blocker","time":1606156864333,"parentName":"Parent 1"},{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"19329621-1698-48ba-a892-1b8f2410d727","name":"Child 4","levelId":3,"description":"If two tasks have same priority, first created one has high priority.","state":1,"level":"Blocker","time":1606157284498},{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"4a182434-2515-4fcf-a3e0-bae9b56744fd","name":"Child 2","levelId":2,"description":" Description","state":1,"level":"Critical","time":1606156872450},{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"aa649a41-c1e1-4a5d-8195-54bde00e0d90","name":"Child 3","levelId":1,"description":"Child 3 description and description aaaannnnnndddd...","state":1,"level":"High","time":1606157230954,"parentName":"Parent 1"}],"level":"Blocker","time":1606156625875},{"id":"bff03e61-9562-4478-aadc-5e6c1222921d","name":"Parent 4 is Closed?","levelId":2,"description":"Is this task closed?","state":0,"subTasks":[],"level":"Critical","time":1606157443720},{"id":"2a508064-85ee-4b3a-9121-a9b7bf156152","name":"Parent 5 Has Only One...","levelId":2,"description":null,"state":1,"subTasks":[{"parentId":"2a508064-85ee-4b3a-9121-a9b7bf156152","id":"55afcb4e-429f-44bd-ba63-3a4e8e29d634","name":"Child 5","levelId":0,"description":"It is not so important...","state":1,"level":"Low","time":1606157536603}],"level":"Critical","time":1606157501896},{"id":"d699bd43-5d72-404b-b51a-2452948c1c53","name":"Parent 3 High!","levelId":1,"description":"It's a high level task! Be awere of this!","state":1,"subTasks":[],"level":"High","time":1606157360001},{"id":"77c3ff59-fd18-46f4-8d3a-e0ab769c4d64","name":"Parent 2","levelId":0,"description":"Parent 2 is a low level task...","state":1,"subTasks":[],"level":"Low","time":1606156635770}]
            },
            getters:{
                getStateNameById: (state) => (payload) => {
                    let foundState = state.states.find(x => x.id == payload)
                    //this.state.all.levels
                    if(foundState){
                        return foundState.name
                    }
                    return null
                },
                getDefinedValues(state){
                    return state.definedValues
                },
                getMaxSubtaskLength(state){
                    return state.definedValues.maxSubtaskLength
                }
            }
		}
	}
})
describe("TaskList", () => {
    it("renders the TaskList using a real Vuex store", () => {
        const wrapper = shallowMount(TaskList, {
            store, 
            localVue ,
            propsData: {
              state:"1",
              taskList: [{"id":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","name":"Parent 1","levelId":3,"description":"Parent 1 Description","state":1,"subTasks":[{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"c71c9c8f-c12e-4a4a-b963-6179b6a6cc68","name":"Child 1","levelId":3,"description":"Child 1 Description","state":1,"level":"Blocker","time":1606156864333,"parentName":"Parent 1"},{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"19329621-1698-48ba-a892-1b8f2410d727","name":"Child 4","levelId":3,"description":"If two tasks have same priority, first created one has high priority.","state":1,"level":"Blocker","time":1606157284498},{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"4a182434-2515-4fcf-a3e0-bae9b56744fd","name":"Child 2","levelId":2,"description":" Description","state":1,"level":"Critical","time":1606156872450},{"parentId":"e18f6c0a-f3f6-4139-8752-3d30b6ad0cd2","id":"aa649a41-c1e1-4a5d-8195-54bde00e0d90","name":"Child 3","levelId":1,"description":"Child 3 description and description aaaannnnnndddd...","state":1,"level":"High","time":1606157230954,"parentName":"Parent 1"}],"level":"Blocker","time":1606156625875},{"id":"bff03e61-9562-4478-aadc-5e6c1222921d","name":"Parent 4 is Closed?","levelId":2,"description":"Is this task closed?","state":0,"subTasks":[],"level":"Critical","time":1606157443720},{"id":"2a508064-85ee-4b3a-9121-a9b7bf156152","name":"Parent 5 Has Only One...","levelId":2,"description":null,"state":1,"subTasks":[{"parentId":"2a508064-85ee-4b3a-9121-a9b7bf156152","id":"55afcb4e-429f-44bd-ba63-3a4e8e29d634","name":"Child 5","levelId":0,"description":"It is not so important...","state":1,"level":"Low","time":1606157536603}],"level":"Critical","time":1606157501896},{"id":"d699bd43-5d72-404b-b51a-2452948c1c53","name":"Parent 3 High!","levelId":1,"description":"It's a high level task! Be awere of this!","state":1,"subTasks":[],"level":"High","time":1606157360001},{"id":"77c3ff59-fd18-46f4-8d3a-e0ab769c4d64","name":"Parent 2","levelId":0,"description":"Parent 2 is a low level task...","state":1,"subTasks":[],"level":"Low","time":1606156635770}]
            },
            data: function() {
              return {
                  stateName: 'Open',
                  paginationCurrent: 1,
                  paginationSize: 1
              }
            }
          })
        expect(wrapper.html()).toContain("<span class=\"clickable Critical\"><i class=\"fas fa-clipboard mr-2\"></i> Parent 4 is Closed?</span>")
        // expect(wrapper.find(".btn.btn-sm").classes()).toBe("1")
    })

})