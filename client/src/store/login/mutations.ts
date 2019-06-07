import { MutationTree } from 'vuex';
import { LoginState } from './types';
import { LoginResponse } from '@/core/services/login/login-service.interface';

export interface LoginMutation {
  loginSuccess: (payload: LoginResponse) => void;
  loginError: (payload: { error: boolean }) => void;
  loginUnauthorized: (payload: { unauthorized: boolean }) => void;
  loginStartRequest: () => void;
}

export const mutations: MutationTree<LoginState> = {
  loginStartRequest(state: LoginState) {
    state.error = false;
    state.unauthorized = false;
    state.loading = true;
  },
  loginSuccess(state: LoginState, payload: LoginResponse) {
    state.error = false;
    state.firstName = payload.firstName;
    state.loading = false;
  },
  loginError(state: LoginState, payload: { error: boolean }) {
    state.error = payload.error;
    state.firstName = undefined;
    state.loading = false;
  },
  loginUnauthorized(state: LoginState, payload: { unauthorized: boolean }) {
    state.unauthorized = payload.unauthorized;
    state.loading = false;
  },
};
