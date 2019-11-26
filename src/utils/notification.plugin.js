import localize from '@/filters/localize.filter';

export default {
  install(Vue, options) {
    Vue.prototype.$notification = function notification(html) {
      window.M.toast({ html });
    };

    Vue.prototype.$error = function error(html) {
      window.M.toast({ html: `[${localize('Error')}]: ${html}` });
    };
  },
};
