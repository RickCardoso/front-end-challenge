import { GetterTree } from 'vuex';
import { LoginState } from '@/store/login/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<LoginState, RootState> = {
  fullName(state): string {
    const {firstName} = state;
    return firstName || '';
  },
};
