import Vue from 'vue'
import Vuex from 'vuex'
import messages from "./modules/messages";
import task from "./modules/task";
import subtask from "./modules/subtask";
import all from "./modules/all";

Vue.use(Vuex)

export default new Vuex.Store({
	namespaced: true,
    modules:{
        messages, task, subtask, all
    },

    state: {
    },

    mutations: {
    },

    actions: {
    },

    getters: {
    }
})
