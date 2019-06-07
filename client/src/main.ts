// core imports
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';

import loadVueMaterial from './load-vue-material';
import loadVueJsLogger from './load-vuejs-logger';
import loadCustomDirectives from './load-custom-directives';

loadVueJsLogger();
loadVueMaterial();
loadCustomDirectives();

// @ts-ignore
export const logger = Vue.$log;

// plugins types configuration
declare module 'vue/types/vue' {

  interface Vue {
    $log: any;
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
