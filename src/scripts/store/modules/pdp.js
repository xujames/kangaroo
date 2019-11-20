const state = {
  currentVariant: null
};

const mutations = {
  SET_VARIANT(state, variant) {
    state.currentVariant = variant;
  }
};

const actions = {
  update({ commit }, variant) {
    commit("SET_VARIANT", variant);
  }
};

export default { namespaced: true, state, mutations, actions };
