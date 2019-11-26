import localize from '../filters/localize.filter';

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_NAME;
      return `${localize(titleKey)} | ${appName}`;
    };
  },
};
