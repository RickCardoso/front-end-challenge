import { Module } from 'vuex';
import clientService from '@/core/services/client';
import { Client, ClientResponse, CreateClientServerParams } from '@/core/services/client/client-service.interface';
import { RootState } from '@/store/types';
import { logger } from '@/main';
import { HttpError } from '@/core/http';
import auth from '@/core/auth';
import router from '@/router';

export interface ClientState {
  clients: Client[];
  error: boolean;
  loading: boolean;
  create: {
    showModal: boolean;
    loading: boolean;
    error: boolean;
    success: boolean;
  };
}

export interface CreateClientParams {
  name: string;
  documentType: string;
  documentNumber: string;
  neighborhood: string;
  city: string;
  status: string;
  partnerName: string;
  partnerDocument: string;
}

export const initialState: ClientState = {
  clients: [],
  error: false,
  loading: false,
  create: {
    showModal: false,
    loading: false,
    error: false,
    success: false,
  },
};

export interface ClientActions {
  createClient(params: CreateClientParams): void;

  loadClients: () => void;
}

function mapCreateParams(original: CreateClientParams): CreateClientServerParams {
  return {
    name: original.name,
    address: '',
    neighborhood: original.neighborhood,
    city: original.city,
    status: original.status,
    document: {
      type: original.documentType,
      number: original.documentNumber,
    },
    partners: [
      {
        name: original.partnerName,
        document: original.partnerDocument,
      },
    ],
  };
}

const store: Module<ClientState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    loadClients({commit}): void {
      commit('clientsStartRequest');
      clientService.list().then((resp) => {
        logger.info(resp);
        const payload: ClientResponse = resp && resp.data;
        commit('clientsSuccess', payload);
      }).catch((e: HttpError<string>) => {
        if (e.statusCode === 401) {
          auth.logout();
          router.push('/login');
        } else {
          commit('clientsError', {error: true});
        }
      });
    },
    createClient({commit}, params: CreateClientParams) {
      commit('startCreate');
      clientService.create(mapCreateParams(params))
        .then(() => {
          commit('successCreate');
          commit('showModal', {shown: false});
        })
        .catch((e) => {
          console.error(e);
          commit('errorCreate', {error: true});
        });
    },
  },
  mutations: {
    resetState(state: ClientState) {
      Object.assign(state, initialState);
    },
    successCreate(state: ClientState) {
      state.create.error = false;
      state.create.loading = false;
      state.create.success = true;
    },
    errorCreate(state: ClientState, {error}) {
      state.create.error = error;
      state.create.loading = false;
    },
    startCreate(state: ClientState) {
      state.create.error = false;
      state.create.loading = true;
    },
    clientsStartRequest(state: ClientState) {
      state.error = false;
      state.loading = true;
    },
    showModal(state: ClientState, {shown}) {
      state.create.showModal = shown;
    },
    clientsSuccess(state: ClientState, payload: ClientResponse) {
      state.error = false;
      state.clients = payload.clients;
      state.loading = false;
    },
    clientsError(state: ClientState, payload: { error: boolean }) {
      state.error = payload.error;
      state.loading = false;
    },
  },
};

export default store;
