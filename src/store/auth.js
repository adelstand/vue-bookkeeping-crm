import firebase from 'firebase/app';

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUID');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 0,
          name,
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
    async logout() {
      await firebase.auth().signOut();
    },
  },
};
