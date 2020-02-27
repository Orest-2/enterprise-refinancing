import axios from 'axios';

// initial state
const initState = {
  data: null,
  hasresult: false,
};

const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setHasResult(state, data) {
    state.hasresult = data;
  },
};

const getters = {};

const actions = {
  fetchCalc({ commit }, data) {
    axios.post('/api/calc', data).then((res) => {
      commit('setData', res.data);
      commit('setHasResult', true);
    });
  },

  reset({ commit }) {
    commit('setData', null);
    commit('setHasResult', false);
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
