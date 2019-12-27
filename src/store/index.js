import Vue from 'vue'
import Vuex from 'vuex'
import state from '../store/state'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations: {
        ['SET_USER'](state, data) {
            state.loginMsg = data
        }
    },
    actions: {},
    modules: {}
})