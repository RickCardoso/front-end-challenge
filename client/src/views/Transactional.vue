<template>
  <div id="home">
    <AppToolbar></AppToolbar>
    <AppContainer :title="title" :loading="loading">
      <md-table>
        <md-table-row v-for="item in transactions">
          <md-table-cell>{{item.date}}</md-table-cell>
          <md-table-cell><span v-brand-id="item.brandId"></span></md-table-cell>
          <md-table-cell>{{item.bin}}</md-table-cell>
          <md-table-cell>{{item.amount}}</md-table-cell>
          <md-table-cell>
            <md-icon v-transaction-status="item.statusId"></md-icon>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </AppContainer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AppToolbar from '@/components/AppToolbar.vue';
  import AppContainer from '@/components/AppContainer.vue';
  import { Action, State } from 'vuex-class';
  import { ClientActions, ClientState } from '@/store/client';
  import { ClientTransaction } from '@/core/services/client/client-service.interface';

  @Component({
    components: {AppContainer, AppToolbar},
  })
  export default class Transactional extends Vue {

    @State('client')
    public clientState!: ClientState;
    @Action('loadClientTransactions', {namespace: 'client'})
    public loadClientTransactions!: ClientActions['loadClientTransactions'];

    get loading() {
      return this.clientState.transactional.loading;
    }

    get title() {
      return 'Transactional';
    }

    get transactions(): ClientTransaction[] {
      return this.clientState && this.clientState.transactional && this.clientState.transactional.transactions;
    }

    mounted() {
      this.loadData();
    }

    loadData() {
      this.loadClientTransactions({id: this.$route.params.clientId});
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
