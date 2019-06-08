<template>
  <div id="app">
    <router-view/>

    <md-snackbar
      :md-active="mustShowSnack"
      md-position="center"
      md-persistent>
      <span>{{snackState.message}}</span>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { State } from 'vuex-class';
  import { SnackState } from '@/store/snack';

  @Component
  export default class App extends Vue {

    @State('snack')
    public snackState!: SnackState;

    get mustShowSnack() {
      return Boolean(this.snackState.message);
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Ubuntu, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000000;
    background: $background-body;
    min-height: 100vh;
  }
</style>
