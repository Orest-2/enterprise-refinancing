import axios from 'axios';

// initial state
const initState = {
  data: null,
  hasresult: false,
  loading: false,
};

const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setHasResult(state, data) {
    state.hasresult = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
};

const getters = {};

const actions = {
  fetchCalc({ commit }, data) {
    commit('setLoading', true);

    axios.post('https://enterprise-refinancing.herokuapp.com/api/calc', data)
      .then((res) => {
        commit('setData', res.data);
        commit('setHasResult', true);
        commit('setLoading', false);
      })
      .catch(() => {
        commit('setLoading', false);
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
