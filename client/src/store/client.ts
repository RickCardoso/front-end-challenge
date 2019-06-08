import { Module } from 'vuex';
import clientService from '@/core/services/client';
import {
  Client,
  ClientDetailResponse,
  ClientListItem,
  ClientResponse, ClientTransaction,
  ClientTransactionsResponse,
  CreateClientServerParams,
  EditClientServerParams
} from '@/core/services/client/client-service.interface';
import { RootState } from '@/store/types';
import { logger } from '@/main';
import { HttpError } from '@/core/http';
import auth from '@/core/auth';
import router from '@/router';

export interface ClientState {
  clients: ClientListItem[];
  error: boolean;
  loading: boolean;
  create: {
    showModal: boolean;
    loading: boolean;
    error: boolean;
    success: boolean;
  };
  detail: {
    client: Client | null;
    showModal: boolean;
    loading: boolean;
    error: boolean;
    success: boolean;
  };
  edit: {
    client: Client | null;
    loading: boolean;
    error: boolean;
    success: boolean;
  };
  transactional: {
    transactions: ClientTransaction[];
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

export interface EditClientParams {
  address: string;
  neighborhood: string;
  city: string;
  status: string | number;
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
  detail: {
    client: null,
    showModal: false,
    loading: false,
    error: false,
    success: false,
  },
  edit: {
    client: null,
    loading: false,
    error: false,
    success: false,
  },
  transactional: {
    transactions: [],
    loading: false,
    error: false,
    success: false,
  },
};

export interface ClientActions {
  createClient(params: CreateClientParams): void;

  loadClient(params: { id: number | string }): void;

  editClient(params: { id: number | string; data: EditClientParams }): void;

  loadClientTransactions(data: { id: number | string }): void;

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

function mapEditParams(original: EditClientParams): EditClientServerParams {
  return {
    address: original.address,
    neighborhood: original.neighborhood,
    city: original.city,
    status: original.status,
  };
}

const store: Module<ClientState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    loadClients({commit, dispatch}): void {
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
          dispatch('snack/setSnack', {message: 'Não foi possível processar sua requisição.'}, {root: true});
        }
      });
    },
    createClient({commit, dispatch}, params: CreateClientParams) {
      commit('startCreate');
      clientService.create(mapCreateParams(params))
        .then(() => {
          dispatch('loadClients');
          commit('successCreate');
          commit('showModal', {shown: false});
        })
        .catch((e) => {
          console.error(e);
          commit('errorCreate', {error: true});
          dispatch('snack/setSnack', {message: 'Não foi possível criar o cliente no momento.'}, {root: true});
        });
    },
    editClient({commit, dispatch}, params: { id: number; data: EditClientParams }) {
      commit('startEditRequest');
      clientService.edit(params.id, mapEditParams(params.data))
        .then(() => {
          dispatch('loadClient', {id: params.id})
          commit('successEdit');
          commit('showEditModal', {shown: false});
        })
        .catch((e) => {
          console.error(e);
          commit('errorEdit', {error: e});
          dispatch('snack/setSnack', {message: 'Não foi processar a sua requisição no momento.'}, {root: true});
        });
    },
    loadClient({commit, dispatch}, {id}) {
      commit('startDetailRequest');
      clientService.detail({id})
        .then((response) => {
          commit('successDetailRequest', response.data);
        })
        .catch((e) => {
          console.error(e);
          commit('errorDetailRequest');
          dispatch('snack/setSnack', {message: 'Não foi processar a sua requisição no momento.'}, {root: true});
        });
    },
    loadClientTransactions({commit, dispatch}, {id}) {
      commit('startTransactionalRequest');
      clientService.transactions({id})
        .then((response) => {
          commit('successTransactionalRequest', response.data);
        })
        .catch((e) => {
          console.error(e);
          commit('errorTransactionalRequest');
          dispatch('snack/setSnack', {message: 'Não foi processar a sua requisição no momento.'}, {root: true});
        });
    },
  },
  mutations: {
    resetState(state: ClientState) {
      Object.assign(state, initialState);
    },
    // < create >
    successCreate(state: ClientState) {
      state.create.error = false;
      state.create.loading = false;
      state.create.success = true;
    },
    startCreate(state: ClientState) {
      state.create.error = false;
      state.create.loading = true;
    },
    errorCreate(state: ClientState, {error}) {
      state.create.error = error;
      state.create.loading = false;
    },
    // < / create >
    // < list >
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
    // < / list >
    // < detail >
    startDetailRequest(state: ClientState) {
      state.detail.client = null;
      state.detail.error = false;
      state.detail.loading = true;
    },
    successDetailRequest(state: ClientState, payload: ClientDetailResponse) {
      state.detail.error = false;
      state.detail.client = payload.client;
      state.detail.loading = false;
    },
    errorDetailRequest(state: ClientState) {
      state.detail.error = true;
      state.detail.client = null;
      state.detail.loading = false;
    },
    showEditModal(state: ClientState, {shown}) {
      state.detail.showModal = shown;
    },
    // < / detail >
    // < edit >
    startEditRequest(state: ClientState) {
      state.edit.client = null;
      state.edit.error = false;
      state.edit.loading = true;
    },
    successEdit(state: ClientState) {
      state.edit.client = null;
      state.edit.error = false;
      state.edit.loading = false;
    },
    errorEdit(state: ClientState, payload: { error: boolean }) {
      state.edit.error = payload.error;
      state.edit.loading = false;
    },
    // < / edit >
    // < transactional >
    startTransactionalRequest(state: ClientState) {
      state.transactional.transactions = [];
      state.transactional.error = false;
      state.transactional.loading = true;
    },
    successTransactionalRequest(state: ClientState, payload: ClientTransactionsResponse) {
      state.transactional.transactions = payload;
      state.transactional.error = false;
      state.transactional.loading = false;
    },
    errorTransactionalRequest(state: ClientState, payload: { error: boolean }) {
      state.transactional.error = payload.error;
      state.transactional.loading = false;
    },
    // < / transactional >
  },
};

export default store;
