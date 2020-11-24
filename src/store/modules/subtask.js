import _ from 'lodash'
const state  = {
    selectedSubtask: null,
}
  
const getters = {
    getSelectedSubtask(state){
        return state.selectedSubtask
    },
}

const mutations = {
    addSubtask(state,payload){
        let level = this.state.all.levels.find(x => x.id == payload.levelId)
        if(level){
            payload.level = level.name
            payload.time = _.now()
            this.state.task.taskList.find(x => x.id == payload.parentId).subTasks.push(payload)
        }
    },
    setSelectedSubtask(state,payload){
        state.selectedSubtask = payload
    },
    updateSubtask(state,payload){
        console.log(payload)
        console.log(this.state.task.taskList[payload.parentIndex])
        
        this.state.task.taskList[payload.parentIndex].subTasks[payload.index].level = this.state.all.levels.find(x => x.id == payload.levelId).name
        this.state.task.taskList[payload.parentIndex].subTasks[payload.index].state = payload.state
        this.state.task.taskList[payload.parentIndex].subTasks[payload.index].levelId = payload.levelId
        this.state.task.taskList[payload.parentIndex].subTasks[payload.index].description = payload.description
    },
    deleteSubtask(state, payload){
        this.state.task.taskList[payload.parentIndex].subTasks.splice(payload.index, 1)
    }
}
  
const actions = {
    async addSubtask({dispatch,commit},payload){
        let parent = this.state.task.taskList.find(x => x.id == payload.parentId)
        if(parent){
            // console.log(this.getters.task.getSelectedTaskId)
            console.log(this.getters["task/getTaskById"](parent.id))
            console.log(this.getters["task/getSelectedTaskId"])
            
            if(this.getters["task/getTaskById"](parent.id).subTasks == undefined || this.getters["task/getTaskById"](parent.id).subTasks.length<this.state.all.definedValues.maxSubtaskLength){
                await commit("addSubtask",payload)
                await commit("all/updateSubTaskStorage", parent.id, {root: true})
                await commit("all/updateStorage", null, {root: true})
                // actually there could be an another mutation to add subtasks directly to localstorage but the aim is that firebase will be used for backend soon. so there is no need to deal with now. 
            }
            else{
                dispatch("messages/setError", {error:`You exceed the maximum number (${this.state.all.definedValues.maxSubtaskLength}) of subtask number.`}, {root: true})
            }
        }
    },
    async updateSubtask(context, payload){
        try {
            let parentIndex = this.state.task.taskList.findIndex(x => x.id == payload.parentId)
            if(parentIndex == -1) {
                context.dispatch("messages/setError", {error:"Parent task could not find! Something is totally wrong!"}, {root: true})
            }
            else{
                payload.parentIndex = parentIndex
            }
            let index = this.state.task.taskList[parentIndex].subTasks.findIndex(x => x.id == payload.id)
            if(index == -1) {
                context.dispatch("messages/setError", {error:"Subtask could not find! Something is totally wrong!"}, {root: true})
            }
            else {
                payload.index = index
                if(payload.state==0){// open/close checking for parent task
                    let isClosed = true
                    this.state.task.taskList[parentIndex].subTasks.forEach(item => {
                        if(item.state==1){
                            isClosed = false
                        }
                    })
                    if(isClosed){
                        this.state.task.taskList[parentIndex].state=0
                    }
                }
                else{
                    this.state.task.taskList[parentIndex].state = 1
                }
                await context.commit("updateSubtask", payload)
                context.commit("messages/clearError", null, {root: true})
                context.dispatch("messages/setIsSuccess", {message:"Your subtask is successfully updated!"}, {root: true})
                context.commit("all/updateStorage", null, {root: true})
            }
        } catch (error) {
            context.dispatch("messages/setError", {error:error}, {root: true})
        }
    },
    async deleteSubTask(context, payload){
        try {
            let parentIndex = this.state.task.taskList.findIndex(x => x.id == payload.parentId)
            if(parentIndex == -1) {
                context.dispatch("messages/setError", {error:"Parent task could not find! Something is totally wrong!"}, {root: true})
            }

            let index = this.state.task.taskList[parentIndex].subTasks.findIndex(x => x.id == payload.id)
            if(index == -1) {
                context.dispatch("messages/setError", {error:"Subtask could not find! Something is totally wrong!"}, {root: true})
            }
            else {
                payload = {parentIndex, index}
                await context.commit("deleteSubtask", payload)
                context.commit("messages/clearError", null, {root: true})
                context.dispatch("messages/setIsSuccess", {message:"Your subtask is successfully deleted!"}, {root: true})
                context.commit("all/updateStorage", null, {root: true})
            }
        } catch (error) {
            context.dispatch("messages/setError", {error:error}, {root: true})
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
  