import { ActionTree } from 'vuex';
import { LoginState } from './types';
import { RootState } from '../types';
import loginService from '@/core/services/login';
import { LoginParams, LoginResponse } from '@/core/services/login/login-service.interface';
import { logger } from '@/main';
import { HttpError } from '@/core/http';
import auth from '@/core/auth';
import router from '@/router';

export interface LoginActions {
  doLogout: () => void;
  doLogin: (params: LoginParams) => void;
}

export const actions: ActionTree<LoginState, RootState> = {
  doLogout({commit}): void {
    auth.logout();
    commit('resetState', null, {root: true});
    router.push('/login');
  },
  doLogin({commit, dispatch}, {email, password}): void {
    commit('loginStartRequest');
    loginService.login({
      email,
      password,
    }).then((resp) => {
      logger.info(resp);
      const payload: LoginResponse = resp && resp.data;
      auth.setUser({
        firstName: payload.firstName,
      });
      commit('loginSuccess', payload);
      router.push('/');
    }).catch((e: HttpError<string>) => {
      auth.logout();
      if (e.statusCode === 401) {
        commit('loginUnauthorized', {unauthorized: true});
      } else {
        commit('loginError', {error: true});
        dispatch('snack/setSnack', {message: 'Ocorreu um erro. Tente novamente mais tarde.'}, {root: true});
      }
    });
  },
};
