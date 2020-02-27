// initial state
const initState = {
  criterions: JSON.parse(localStorage.getItem('settingsCriterions')) || [],
};

const mutations = {
  setData(state, data) {
    state.criterions = [...data];
    localStorage.setItem('settingsCriterions', JSON.stringify(data));
  },
};

const getters = {};

const actions = {
  addSettings({ state, commit }, data) {
    state.criterions.push({
      ...data,
      k: `K${state.criterions.length + 1}`,
    });

    commit('setData', state.criterions);
  },

  editSettings({ state, commit }, payload) {
    const [index, data] = payload;
    if (data) {
      state.criterions[index] = data;

      commit('setData', state.criterions);
    }
  },

  removeSettings({ state, commit }, index) {
    delete state.criterions[index];

    commit('setData', state.criterions.filter((el) => el));
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
