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
import currencyFilter from '@/filters/currency.filter';
import notificationPlugin from '@/utils/notification.plugin';
import 'materialize-css/dist/js/materialize.min';
import Loader from '@/components/app/Loader.vue';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(notificationPlugin);
Vue.filter('date', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.component('Loader', Loader);


firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
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
