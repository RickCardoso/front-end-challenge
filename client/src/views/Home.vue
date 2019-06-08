<template>
  <div id="home">
    <AppToolbar></AppToolbar>
    <AppContainer title="Clientes" :loading="clientState.loading" @add="openAdd()" :actions="['add']">
      <md-table>
        <md-table-row v-for="item in clientState.clients" @click="goToEdit(item)">
          <md-table-cell md-numeric>{{item.id}}</md-table-cell>
          <md-table-cell>{{item.name}}</md-table-cell>
          <md-table-cell>
            <strong><span v-client-status="item.status"></span></strong>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </AppContainer>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Adicionar cliente</md-dialog-title>
      <md-dialog-content>
        <form novalidate class="md-layout content__login-form" @submit.prevent="validateForm">
          <div class="md-layout md-alignment-center">
            <div class="w-90">
              <!--    name    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('name')">
                    <label for="name">Nome fantasia</label>
                    <md-input v-model="form.name" id="name" name="name" type="name"
                              :disabled="clientState.create.loading"/>
                  </md-field>
                </div>
              </div>

              <!--    documentType    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('documentType')">
                    <label for="documentType">Tipo de Documento</label>
                    <md-select v-model="form.documentType" name="documentType" id="documentType"
                               :disabled="clientState.create.loading">
                      <md-option :value="opt.id" v-for="opt of documentTypeOptions">{{opt.description}}</md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>

              <!--    documentNumber    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('documentNumber')">
                    <label for="documentNumber">Documento</label>
                    <md-input v-model="form.documentNumber" id="documentNumber" name="documentNumber" type="text"
                              :disabled="clientState.create.loading"/>
                  </md-field>
                </div>
              </div>

              <!--    neighborhood    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('neighborhood')">
                    <label for="neighborhood">Bairro</label>
                    <md-input v-model="form.neighborhood" id="neighborhood" name="neighborhood" type="text"
                              :disabled="clientState.create.loading"/>
                  </md-field>
                </div>
              </div>

              <!--    city    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('city')">
                    <label for="city">Cidade</label>
                    <md-input v-model="form.city" id="city" name="city" type="text"
                              :disabled="clientState.create.loading"/>
                  </md-field>
                </div>
              </div>

              <!--    status    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('status')">
                    <label for="status">Status</label>
                    <md-select v-model="form.status" name="status" id="status" :disabled="clientState.create.loading">
                      <md-option :value="opt.id" v-for="opt of statusOptions">{{opt.description}}</md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>


              <!--    partnerName    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('partnerName')">
                    <label for="partnerName">Nome do Sócio</label>
                    <md-input v-model="form.partnerName" id="partnerName" name="partnerName" type="text"
                              :disabled="clientState.create.loading"/>
                  </md-field>
                </div>
              </div>

              <!--    partnerDocument    -->
              <div class="md-layout w-100">
                <div class="md-layout-item">
                  <md-field :class="validationClass('partnerDocument')">
                    <label for="partnerDocument">Documento do Sócio</label>
                    <md-input v-model="form.partnerDocument" id="partnerDocument" name="partnerDocument" type="text"
                              :disabled="clientState.create.loading"/>
                  </md-field>
                </div>
              </div>
            </div>
          </div>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false" :disabled="clientState.create.loading">
          Cancelar
        </md-button>
        <md-button class="md-primary" @click="validateForm" :disabled="clientState.create.loading">
          Salvar
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AppToolbar from '@/components/AppToolbar.vue';
  import AppContainer from '@/components/AppContainer.vue';
  import { Action, Mutation, State } from 'vuex-class';
  import { getValidationClass } from '@/core/helpers';
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import { CLIENT_STATUS_LIST, DOCUMENT_TYPE_LIST } from '@/core/config/constants';
  import { ClientActions, ClientState, CreateClientParams } from '@/store/client';
  import { ClientListItem } from '@/core/services/client/client-service.interface';
  import router from '@/router';

  type Form = CreateClientParams;

  const validations = {
    form: {
      name: {
        required,
      },
      documentType: {
        required,
      },
      documentNumber: {
        required,
      },
      neighborhood: {
        required,
      },
      city: {
        required,
      },
      status: {
        required,
      },
      partnerName: {
        required,
      },
      partnerDocument: {
        required,
      },
    },
  };
  @Component({
    components: {AppContainer, AppToolbar},
    mixins: [validationMixin],
    validations,
  })
  export default class Home extends Vue {

    @State('client')
    public clientState!: ClientState;
    @Action('loadClients', {namespace: 'client'})
    public loadClients!: ClientActions['loadClients'];
    @Action('createClient', {namespace: 'client'})
    public createClient!: ClientActions['createClient'];

    @Mutation('showModal', {namespace: 'client'})
    public showModal: any;

    get showDialog() {
      return this.clientState.create.showModal;
    }

    set showDialog(value: boolean) {
      this.showModal({shown: value});
    }

    public documentTypeOptions = DOCUMENT_TYPE_LIST;
    public statusOptions = CLIENT_STATUS_LIST;

    get loading() {
      return this.clientState.loading;
    }

    public form: Form = {
      name: '',
      documentType: '',
      documentNumber: '',
      neighborhood: '',
      city: '',
      status: '',
      partnerName: '',
      partnerDocument: '',
    };

    public mounted() {
      this.loadClients();
    }

    public openAdd() {
      this.showDialog = true;
    }

    public validateForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sendRequest();
      }
    }

    public sendRequest() {
      this.createClient(this.form);
    }

    public validationClass(fieldName: string) {
      return getValidationClass(this.$v.form, fieldName);
    }

    public goToEdit(client: ClientListItem) {
      router.push({name: 'client-detail', params: {clientId: client.id.toString()}});
    }
  }
</script>


<style lang="scss">
  #home {
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
