import Vue from 'vue';

// material imports

import {
  MdButton,
  MdCard,
  MdField,
  MdSnackbar,
  MdToolbar,
  MdTable,
  MdContent,
  MdDialog,
  MdTabs,
  MdMenu,
  MdList,
  MdProgress,
// @ts-ignore: there's no vue-material typescript types yet: https://github.com/vuematerial/vue-material/issues/662.
} from 'vue-material/dist/components';

// set material custom theme
import './styles/_theme.scss';

export default () => {
  // configure only the components that our app uses
  Vue.use(MdButton);
  Vue.use(MdCard);
  Vue.use(MdField);
  Vue.use(MdSnackbar);
  Vue.use(MdToolbar);
  Vue.use(MdTable);
  Vue.use(MdContent);
  Vue.use(MdDialog);
  Vue.use(MdTabs);
  Vue.use(MdMenu);
  Vue.use(MdList);
  Vue.use(MdProgress);
};
