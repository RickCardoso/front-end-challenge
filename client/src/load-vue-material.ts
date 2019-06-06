import Vue from 'vue';

// material imports
// @ts-ignore: there's no vue-material typescript types yet: https://github.com/vuematerial/vue-material/issues/662.
import { MdButton, MdCard, MdField } from 'vue-material/dist/components';
// set material custom theme
import './styles/_theme.scss';

export default () => {
  // configure only the components that our app uses
  Vue.use(MdButton);
  Vue.use(MdCard);
  Vue.use(MdField);
};
