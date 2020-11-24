const state  = {
    error: null,
    isSucess: null,
    errorTime: 5000,
    successTime: 5000
}
  
const getters = {
    getError(state) {
        return state.error
    },
    getIsSuccess(state){
        return state.isSucess
    },
}

const mutations = {
    clearError(state){
        state.error = null
    },
    setError(state, payload){
        state.error = payload
    },
    setIsSuccess(state, payload){
        state.isSucess = payload
    },
    clearIsSuccess(state){
        state.isSucess = null
    },
}
  
    const actions = {
        setErrorClear(context,payload){
            context.commit("setError", payload.error)
            let time = (payload.time && payload.time!=undefined) ? payload.time : state.errorTime
            setTimeout(() => {context.commit("clearError")}, time)
        },
        setError(context,payload){
            try {
                context.commit("clearIsSuccess")
                context.dispatch("setErrorClear", payload)
            } catch (error) {
                context.dispatch("setErrorClear", {error})
            }
        },

        
        setIsSuccessClear(context,payload){
            context.commit("setIsSuccess", payload.message)
            let time = (payload.time && payload.time!=undefined) ? payload.time : state.successTime
            setTimeout(() => {context.commit("clearIsSuccess")}, time)
            console.log(payload)
        },
        setIsSuccess(context,payload){
            console.log(payload)
            try {
                context.commit("clearError")
                context.dispatch("setIsSuccessClear", payload)
            } catch (error) {
                context.dispatch("setErrorClear", {error})
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
  