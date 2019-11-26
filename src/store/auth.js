import firebase from 'firebase/app';

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name, bill = 0, locale = 'ru-RU' }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUID');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill,
          name,
          locale,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUID() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit('clearInfo');
    },
  },
};
