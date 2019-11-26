import firebase from 'firebase/app';

export default {
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUID');
        return await firebase.database().ref(`/users/${uid}/records/`).push(record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUID');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};

        return Object.keys(records).map(key => ({ ...records[key], id: key }));
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordByID({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUID');
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};

        return { ...record, id };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};