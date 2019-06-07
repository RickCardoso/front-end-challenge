import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/store/types';
import { login, state as loginState } from '@/store/login';
import client, { initialState as clientState } from '@/store/client';

Vue.use(Vuex);

const initialState = {
  login: loginState,
  client: clientState,
};

export interface RootActions {
  resetState(): void;
}

const store: StoreOptions<RootState> = {
  state: initialState,
  actions: {
    resetState({commit}) {
      commit('resetState');
    },
  },
  mutations: {
    resetState(state: RootState) {
      Object.assign(state, initialState);
    },
  },
  modules: {
    login,
    client,
  },
};

export default new Vuex.Store<RootState>(store);
