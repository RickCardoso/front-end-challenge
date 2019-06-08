<template>
  <div id="clientDetail">
    <AppToolbar></AppToolbar>
    <AppContainer :title="title" :loading="loadingDetail" @edit="openEdit()" :actions="['edit']">
      <div class="md-layout app-container-detail" v-if="client">
        <div class="md-layout">
          <div class="md-layout-item md-size-3x md-gutter">
            <span class="app-container-detail__label">ID</span>
            <span class="app-container-detail__value">{{client.id}}</span>
          </div>
          <div class="md-layout-item md-size-3x md-gutter">
            <span class="app-container-detail__label">Tipo</span>
            <span class="app-container-detail__value"><span v-client-document-type="client.document.type"></span></span>
          </div>
          <div class="md-layout-item md-size-3x md-gutter">
            <span class="app-container-detail__label">Documento</span>
            <span class="app-container-detail__value">{{client.document.number}}</span>
          </div>
          <div class="md-layout-item md-size-3x md-gutter">
            <span class="app-container-detail__label">Status</span>
            <span class="app-container-detail__value"><span v-client-status="client.status"></span></span>
          </div>
        </div>

        <hr>

        <div class="md-layout">
          <div class="md-layout-item md-size-3x md-gutter">
            <span class="app-container-detail__label">Endereço</span>
            <span class="app-container-detail__value">{{client.address}}</span>
          </div>
          <div class="md-layout-item md-size-3x md-gutter">
            <span class="app-container-detail__label">Bairro</span>
            <span class="app-container-detail__value">{{client.neighborhood}}</span>
          </div>
          <div class="md-layout-item md-size-3x md-gutter">
            <span class="app-container-detail__label">Cidade</span>
            <span class="app-container-detail__value">{{client.city}}</span>
          </div>
        </div>
        <hr>

        <div class="md-layout flex-c">
          <h4 class="md-title">Sócios</h4>
          <div class="md-layout" v-for="partner of client.partners">
            <div class="md-layout-item md-size-3x md-gutter">
              <span class="app-container-detail__label">Nome</span>
              <span class="app-container-detail__value">{{partner.name}}</span>
            </div>
            <div class="md-layout-item md-size-3x md-gutter">
              <span class="app-container-detail__label">Documento</span>
              <span class="app-container-detail__value">{{partner.document}}</span>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
    <ClientEdit
      :open="showDialog"
      :loading="loadingEdit"
      :form.sync="form"
      @success-submit="successSubmit()"
      @cancel-modal="onCloseModal()"
    ></ClientEdit>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AppToolbar from '@/components/AppToolbar.vue';
  import AppContainer from '@/components/AppContainer.vue';
  import { Action, Mutation, State } from 'vuex-class';
  import { ClientActions, ClientState, EditClientParams } from '@/store/client';
  import ClientEdit from '@/components/ClientEdit.vue';

  interface Form extends EditClientParams {
  }

  @Component({
    components: {AppContainer, AppToolbar, ClientEdit},
  })
  export default class ClientDetail extends Vue {

    @State('client')
    public clientState!: ClientState;

    @Action('loadClient', {namespace: 'client'})
    public loadClient!: ClientActions['loadClient'];

    @Action('editClient', {namespace: 'client'})
    public editClient!: ClientActions['editClient'];

    @Mutation('showEditModal', {namespace: 'client'}) showEditModal: any;

    get client() {
      return this.clientState.detail.client;
    }

    get loadingDetail() {
      return this.clientState.detail.loading;
    }
    get loadingEdit() {
      return this.clientState.detail.loading;
    }

    get title() {
      return this.client && this.client.name;
    }

    form: Form = {
      address: '',
      neighborhood: '',
      city: '',
      status: '',
    };

    mounted() {
      this.loadClient({id: this.$route.params.clientId});
    }

    openEdit() {
      if (this.client) {
        this.form = {
          address: this.client.address,
          neighborhood: this.client.neighborhood,
          city: this.client.city,
          status: this.client.status,
        };
      }
      this.showDialog = true;
    }

    successSubmit() {
      this.sendRequest();
    }

    onCloseModal() {
      this.showDialog = false
    }

    public sendRequest() {
      this.editClient({id: this.$route.params.clientId, data: this.form});
    }

    get showDialog() {
      return this.clientState.detail.showModal;
    };

    set showDialog(value: boolean) {
      this.showEditModal({shown: value});
    };

  }
</script>


<style lang="scss">
  #clientDetail {
    background: #ffffff;
    min-height: 100vh;
    min-width: 100%;

    form {
      padding: 0 2rem;
    }
  }

  .md-dialog {
    max-width: 768px;
    min-width: 500px;
  }
</style>
