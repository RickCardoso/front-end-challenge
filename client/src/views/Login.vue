<template>
  <div id="login">
    <div class="login__logo">
      <img alt="Logo Boulder" src="../assets/images/logo_transparent.png" title="Boulder">
    </div>
    <div class="content">
      <form novalidate class="md-layout content__login-form" @submit.prevent="validateForm">
        <md-card class="content__login-form__content">
          <md-card-header>
            <span class="md-title">Login</span>
          </md-card-header>
          <md-card-content>

            <div class="md-layout md-layout-item md-gutter" v-if="unauthorized">
              <span class="error-form">Credenciais de acesso incorretas.</span>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="validationClass('email')">
                  <label for="email">E-mail</label>
                  <md-input v-model="form.email" id="email" name="email" type="email" :disabled="loading"/>
                  <span class="md-error" v-if="!$v.form.email.required">Insira seu e-mail de cadastro</span>
                  <span class="md-error" v-else-if="!$v.form.email.email">Insira um e-mail válido</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="validationClass('password')">
                  <label for="password">Senha</label>
                  <md-input v-model="form.password" id="password" name="password" type="password" :disabled="loading"/>
                  <span class="md-error" v-if="!$v.form.password.required">Insira sua senha</span>
                  <span class="md-error" v-if="!$v.form.password.minLength">Insira no mínimo 4 caracteres</span>
                </md-field>
              </div>
            </div>

          </md-card-content>
          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="loading">Entrar</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>

    <md-snackbar
      :md-duration="3000"
      :md-active.sync="showLoginError"
      md-position="center"
      md-persistent>
      <span>Não foi possível processar sua requisição.</span>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Mutation, State } from 'vuex-class';
  import { LoginActions } from '@/store/login/actions';
  import { LoginMutation } from '@/store/login/mutations';
  import { validationMixin } from 'vuelidate';
  import { email, minLength, required } from 'vuelidate/lib/validators'
  import { getValidationClass } from '@/core/helpers';
  import auth from '@/core/auth';
  import config from '@/core/config';

  const namespace = 'login';

  interface LoginForm {
    email: string | null;
    password: string | null;
  }

  const validations = {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4),
      }
    }
  };
  @Component({
    mixins: [validationMixin],
    validations: validations
  })
  export default class Login extends Vue {
    @State('error', {namespace})
    public error!: boolean;
    @State('unauthorized', {namespace})
    public unauthorized!: boolean;
    @State('loading', {namespace})
    public loading!: boolean;

    @Action('doLogin', {namespace})
    public doLogin!: LoginActions['doLogin'];

    @Mutation('loginError', {namespace})
    public loginError!: LoginMutation['loginError'];

    get showLoginError(): boolean {
      return this.error;
    }

    set showLoginError(value: boolean) {
      this.loginError({error: value})
    }

    public form: LoginForm = {
      email: config.DEBUG ? 'john@gmail.com' : null,
      password: config.DEBUG ? 'passwd' : null,
    };

    public validateForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sendLoginRequest();
      }
    }

    public sendLoginRequest() {
      if (this.form.email && this.form.password) {
        this.doLogin({
          email: this.form.email,
          password: this.form.password,
        });
      }
    }

    public validationClass(fieldName: string) {
      return getValidationClass(this.$v.form, fieldName);
    }
  }
</script>


<style lang="scss" scoped>
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
      /*padding: 2rem 1rem;*/
      text-align: center;
      margin-bottom: auto;
      margin-top: 20px;

      &__content {
        padding: 2rem 1rem;
      }
    }
  }

  .error-form {
    color: $text-error;
  }
</style>
