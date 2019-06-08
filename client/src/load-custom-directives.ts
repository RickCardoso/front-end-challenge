import Vue from 'vue';
import { CLIENT_STATUS_LIST, DOCUMENT_TYPE_LIST } from '@/core/config/constants';

export default () => {
  Vue.directive('clientStatus', {
    bind(el, binding, vnode) {
      if (!binding.value) {
        return;
      }
      const item = CLIENT_STATUS_LIST.find((i) => i.id.toString() === binding.value.toString());
      el.innerText = item ? item.description : 'Desconhecido';
      el.style.color = item ? item.color : 'black';
    },
  });

  Vue.directive('clientDocumentType', {
    bind(el, binding, vnode) {
      if (!binding.value) {
        return;
      }
      const item = DOCUMENT_TYPE_LIST.find((i) => i.id.toString() === binding.value.toString());
      el.innerText = item ? item.description : 'Desconhecido';
    },
  });

};
