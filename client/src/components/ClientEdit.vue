<template>
  <md-dialog :md-active="open">
    <md-dialog-title>Editar cliente</md-dialog-title>
    <md-dialog-content>
      <form novalidate class="md-layout content__login-form" @submit.prevent="validateForm">
        <div class="md-layout md-alignment-center">
          <div class="w-90">
            <!--    address    -->
            <div class="md-layout w-100">
              <div class="md-layout-item">
                <md-field :class="validationClass('address')">
                  <label for="address">Endereço</label>
                  <md-input v-model="form.address" id="address" name="address" type="text"
                            :disabled="loading"/>
                </md-field>
              </div>
            </div>

            <!--    neighborhood    -->
            <div class="md-layout w-100">
              <div class="md-layout-item">
                <md-field :class="validationClass('neighborhood')">
                  <label for="neighborhood">Bairro</label>
                  <md-input v-model="form.neighborhood" id="neighborhood" name="neighborhood" type="text"
                            :disabled="loading"/>
                </md-field>
              </div>
            </div>

            <!--    city    -->
            <div class="md-layout w-100">
              <div class="md-layout-item">
                <md-field :class="validationClass('city')">
                  <label for="city">Cidade</label>
                  <md-input v-model="form.city" id="city" name="city" type="text"
                            :disabled="loading"/>
                </md-field>
              </div>
            </div>

            <!--    status    -->
            <div class="md-layout w-100">
              <div class="md-layout-item">
                <md-field :class="validationClass('status')">
                  <label for="status">Status</label>
                  <md-select v-model="form.status" name="status" id="status" :disabled="loading">
                    <md-option :value="opt.id" v-for="opt of statusOptions">{{opt.description}}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
          </div>
        </div>
      </form>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="cancelModal()" :disabled="loading">
        Cancelar
      </md-button>
      <md-button class="md-primary" @click="validateForm" :disabled="loading">
        Salvar
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { getValidationClass } from '@/core/helpers';
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import { CLIENT_STATUS_LIST, DOCUMENT_TYPE_LIST } from '@/core/config/constants';
  import { EditClientParams } from '@/store/client';

  interface Form extends EditClientParams {
  }

  const validations = {
    form: {
      address: {
        required
      },
      neighborhood: {
        required
      },
      city: {
        required
      },
      status: {
        required
      },
    }
  };
  @Component({
    components: {},
    mixins: [validationMixin],
    validations: validations
  })
  export default class ClientEdit extends Vue {

    documentTypeOptions = DOCUMENT_TYPE_LIST;
    statusOptions = CLIENT_STATUS_LIST;

    @Prop() loading!: boolean;
    @Prop() form!: Form;
    @Prop() open!: boolean;

    @Emit() cancelModal() {
      return true;
    }

    @Emit() successSubmit() {
      return this.form;
    }

    validateForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.successSubmit();
      }
    }

    public validationClass(fieldName: string) {
      return getValidationClass(this.$v.form, fieldName);
    }
  }
</script>


<style lang="scss" scoped>
  form {
    padding: 0 2rem;
  }

  .md-dialog {
    max-width: 768px;
    min-width: 500px;
  }
</style>

