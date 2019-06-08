<template>
  <md-toolbar class="md-accent" md-elevation="1">
    <router-link class="md-title" style="flex: 1" to="/">Boulder</router-link>
    <span class="md-title username">{{username}}</span>
    <md-button class="md-primary" @click.prevent="logout">Logout</md-button>
  </md-toolbar>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action } from 'vuex-class';
  import { LoginActions } from '@/store/login/actions';
  import auth, { User } from '@/core/auth';

  @Component({
    name: 'app-toolbar',
  })
  export default class AppToolbar extends Vue {
    user: User | null = auth.getUSer();
    username: string = this.user ? this.user.firstName : '';

    @Action('doLogout', {namespace: 'login'})
    public doLogout!: LoginActions['doLogout'];

    public logout() {
      this.doLogout();
    }
  }
</script>


<style lang="scss" scoped>
  .username {
    opacity: 0.5;
  }
</style>
