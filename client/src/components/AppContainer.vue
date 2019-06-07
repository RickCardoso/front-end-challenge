<template>
  <div id="app-container-wrapper" class="md-layout">
    <md-card class="card-container">
      <md-card-header class="container-header">
        <h3 class="md-title">{{title}}</h3>
        <md-button @click="add()" class="md-icon-button md-accent md-raised">
          <md-icon>add</md-icon>
        </md-button>
      </md-card-header>
      <slot/>
    </md-card>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component({
    name: 'app-container'
  })
  export default class AppContainer extends Vue {
    @Prop(String) title: string | undefined;

    @Emit() add(e: MouseEvent) {
      return e;
    };
  }
</script>


<style lang="scss">
  #app-container-wrapper {
    width: 90%;
    max-width: 900px;
    min-height: 50vh;
    margin: 2rem auto auto;
    display: flex;

    .card-container {
      width: 100%;
      height: 100%;
      flex: 1;
    }

    .container-header {
      background: $primary;
      display: flex;

      .md-title {
        flex: 1;
        color: #ffffff;
      }
    }
  }
</style>
