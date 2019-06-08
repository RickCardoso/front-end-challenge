import { Module } from 'vuex';
import { RootState } from '@/store/types';

export interface SnackState {
  message: string;
}

export const initialState: SnackState = {
  message: '',
};

export interface SnackActions {
  setSnack(params: { message: string, duration?: number }): void;
}

const store: Module<SnackState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    setSnack({commit}, {message, duration}) {
      commit('setSnack', {message});
      const snackDuration = typeof duration === 'undefined' ? 3000 : duration;
      setTimeout(() => {
        commit('resetState');
      }, snackDuration);
    },
  },
  mutations: {
    resetState(state: SnackState) {
      state.message = '';
    },
    setSnack(state: SnackState, {message}) {
      state.message = message;
    },
  },
};

export default store;
