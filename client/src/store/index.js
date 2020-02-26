import Vue from 'vue';
import Vuex from 'vuex';

import settings from './modules/settings';
import result from './modules/result';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    result,
  },
});
