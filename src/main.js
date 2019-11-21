import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import notificationPlugin from '@/utils/notification.plugin';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(notificationPlugin);
Vue.filter('date', dateFilter);


firebase.initializeApp({
  apiKey: 'AIzaSyA61zhR0cChuo8Dm4MyQRxSKXJFi4jtJj0',
  authDomain: 'vue-bookkeeping-crm.firebaseapp.com',
  databaseURL: 'https://vue-bookkeeping-crm.firebaseio.com',
  projectId: 'vue-bookkeeping-crm',
  storageBucket: 'vue-bookkeeping-crm.appspot.com',
  messagingSenderId: '1037550530852',
  appId: '1:1037550530852:web:80fe9624d57a37d01083b1',
  measurementId: 'G-X0K3QLGLQS',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
