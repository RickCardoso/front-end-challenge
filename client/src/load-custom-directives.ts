import Vue from 'vue';

export default () => {
  Vue.directive('clientStatus', {
    bind(el, binding, vnode) {
      if (!binding.value) {
        return;
      }
      let label: string;
      let color: string;
      switch (binding.value.toString()) {
        case '1':
          label = 'Aprovado';
          color = 'green';
          break;
        case '2':
          label = 'Bloqueado';
          color = 'yellow';
          break;
        case '3':
          label = 'Cancelado';
          color = 'red';
          break;
        case '4':
          label = 'Descredenciado';
          color = 'gray';
          break;
        default:
          label = 'Status desconhecido';
          color = 'black';
          break;
      }
      el.innerText = label;
      el.style.color = color;
    },
  });
};
