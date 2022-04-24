import Vue from 'vue'
import Vuex from 'vuex'
import Calendar from "./calendar";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'calendar': Calendar
  }
})
