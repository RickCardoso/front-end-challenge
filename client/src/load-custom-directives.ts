import Vue from 'vue';
import { BRAND_LIST, CLIENT_STATUS_LIST, DOCUMENT_TYPE_LIST, TRANSACTION_STATUS_LIST } from '@/core/config/constants';

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

  Vue.directive('brandId', {
    bind(el, binding, vnode) {
      if (!binding.value) {
        return;
      }
      const item = BRAND_LIST.find((i) => i.id.toString() === binding.value.toString());
      el.innerText = item ? item.name : 'Desconhecido';
    },
  });

  Vue.directive('transactionStatus', {
    bind(el, binding, vnode) {
      if (!binding.value) {
        return;
      }
      const item = TRANSACTION_STATUS_LIST.find((i) => i.id.toString() === binding.value.toString());
      el.style.color = item ? item.color : 'black';
      el.innerText = item ? item.icon : '?';
      el.title = item ? item.description : 'Desconhecido';
    },
  });

};
