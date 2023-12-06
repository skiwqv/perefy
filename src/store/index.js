import { createStore } from 'vuex'

import * as mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
import state from './state'

const store = createStore({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
})

export default store