<template>
  <div id="login">
    <div class="login__logo">
      <img alt="Logo Boulder" src="../assets/images/logo_transparent.png" title="Boulder">
    </div>
    <div class="content">
      <md-card class="content__login-form">
        <md-card-header>
          <span class="md-title">Login</span>
        </md-card-header>
        <md-card-content>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="mail">E-mail</label>
                <md-input id="mail" name="mail" type="email"/>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="mail">Senha</label>
                <md-input id="password" name="password" type="password"/>
              </md-field>
            </div>
          </div>

        </md-card-content>
        <md-card-actions>
          <md-button>Entrar</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Login extends Vue {

  }
</script>


<style lang="scss">
  #login {
    background: $background-body-secondary;
    min-height: 100vh;
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }

  .container-boxed {
    @extend .flex-centered;
    padding: 1rem 0.5rem;
  }

  .login__logo {
    @extend .container-boxed;

    img {
      width: 100%;
      max-width: 250px;
    }
  }

  .content {
    @extend .container-boxed;
    flex: 1;
    background: $primary;

    &__login-form {
      @extend .flex-centered;
      flex-direction: column;
      flex: 1;
      width: 80%;
      height: 90%;
      min-width: 300px;
      min-height: 300px;
      max-width: 400px;
      max-height: 400px;
      padding: 2rem 1rem;
      text-align: center;
      margin-bottom: auto;
      margin-top: 20px;
    }
  }
</style>
