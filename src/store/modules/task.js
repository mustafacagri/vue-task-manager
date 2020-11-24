import _ from 'lodash'
const state  = {
    selectedTaskId: null,
    selectedTask: null,
    taskList: null
}
  
const getters = {
    getTasks(state){
        return state.taskList
    },
    getTaskListByState: (state) => (payload) => {
        if(state.taskList){
            return state.taskList.filter(x => x.state === payload)
        }
        else{
            return null
        }
    },
    getTaskById: (state) => (payload) => {
        return state.taskList.find(x => x.id == payload)
    },
    getSelectedTaskId(state){
        return state.selectedTaskId
    },
    getSelectedTask(state){
        return state.selectedTask
    },
    getTaskNameAndId(state){
        return _.map(state.taskList, _.partialRight(_.pick, ['id', 'name']))
    }
}

const mutations = {
    setSelectedTaskId(state,payload){
        state.selectedTaskId = payload
    },
    addTask(state,payload){
        let level = this.state.all.levels.find(x => x.id == payload.levelId)
        if(level){
            payload.level = level.name
            payload.time = _.now()
            if(!state.taskList){
                state.taskList = new Array()
            }
            state.taskList.push(payload)
        }
    },
    updateTask(state,payload){
        state.taskList[payload.index].level = this.state.all.levels.find(x => x.id == payload.levelId).name
        state.taskList[payload.index].state = payload.state
        state.taskList[payload.index].levelId = payload.levelId
        state.taskList[payload.index].description = payload.description
    },
    setSelectedTask(state,payload){
        state.selectedTask = payload
    },
    deleteTask(state, payload){
        this.state.task.taskList.splice(payload.index, 1)
    }
}
  
const actions = {
    async addTask(context,payload){
        let okay = false, found
        if(!context.state.taskList){
            okay = true
        }
        else{
            if(context.state.taskList){
                found = context.state.taskList.find(x => x.name == payload.name)
                if(!found){okay = true}
            }
        }
        if(okay){
            await context.commit("addTask",payload)
            context.commit("all/updateStorage", null, {root: true})
        }
        else{
            context.dispatch("messages/setError", {error:`You already have a task named "${payload.name}".`}, {root: true})
        }
    },
    async updateTask(context, payload){
        try {
            let index = context.state.taskList.findIndex(x => x.id == payload.id)
            if(index == -1) {
                context.dispatch("messages/setError", {error:"Task could not find! Something is totally wrong!"}, {root: true})
            }
            else {
                payload.index = index
                await context.commit("updateTask", payload)
                context.commit("messages/clearError", null, {root: true})
                context.dispatch("messages/setIsSuccess", {message:"Your task is successfully updated!"}, {root: true})
                context.commit("all/updateStorage", null, {root: true})
            }
        } catch (error) {
            context.dispatch("messages/setError", {error}, {root: true})
        }
    },
    async deleteTask(context, payload){
        console.log("deleteTask")
        try {
            let index = this.state.task.taskList.findIndex(x => x.id == payload.id)
            if(index == -1) {
                context.dispatch("messages/setError", {error:"Task could not find! Something is totally wrong!"}, {root: true})
            }
            else {
                payload = {index}
                await context.commit("deleteTask", payload)
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
  