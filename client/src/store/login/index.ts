import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { LoginState } from './types';
import { RootState } from '../types';

export const state: LoginState = {
  firstName: undefined,
  error: false,
  unauthorized: false,
  loading: false,
};

const namespaced: boolean = true;

export const login: Module<LoginState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
