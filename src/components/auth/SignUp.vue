<template>
  <form class="container" @submit.prevent="submitForm">
    <div class="field">
      <label for="firstName">First Name</label>
      <InputText
        id="firstName"
        type="text"
        aria-describedby="firstname-help"
        class="p-inputtext-sm input"
        autocomplete="off"
        v-model.lazy="formData.firstName"
      />
      <small id="email-help" class="p-error" v-if="v$.firstName.$error">
        First name is required
      </small>
    </div>
    <div class="field">
      <label for="lastName">Last name</label>
      <InputText
        id="lastName"
        type="text"
        aria-describedby="lastname-help"
        class="p-inputtext-sm input"
        autocomplete="off"
        v-model.lazy="formData.lastName"
      />
      <small id="email-help" class="p-error" v-if="v$.lastName.$error">
        Last name is required
      </small>
    </div>
    <div class="field">
      <label for="email">Email</label>
      <InputText
        id="email"
        type="text"
        aria-describedby="username2-help"
        class="p-inputtext-sm input"
        autocomplete="off"
        v-model.lazy="formData.email"
      />
      <small id="email-help" class="p-error" v-if="v$.email.$error">
        Email is required
      </small>
    </div>
    <div class="field">
      <label for="password">Password</label>
      <InputText
        id="password"
        type="password"
        aria-describedby="username2-help"
        class="p-inputtext-sm"
        v-model.lazy="formData.password"
      />
      <small id="password-help" class="p-error" v-if="v$.password.$error">
        Password is required
      </small>
    </div>
    <div class="field">
      <label for="confirmPassword">Password</label>
      <InputText
        id="confirmPassword"
        type="password"
        aria-describedby="username2-help"
        class="p-inputtext-sm"
        v-model.lazy="formData.confirmPassword"
      />
      <small
        id="password-help"
        class="p-error"
        v-if="v$.confirmPassword.$error"
      >
        Confirmation is required
      </small>
    </div>
    <Button
      type="submit"
      label="Sign Up"
      class="p-button-sm p-button-outlined p-button-text button"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers, sameAs } from '@vuelidate/validators';

export default defineComponent({
  components: { InputText, Button },
  setup(_, context) {
    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const mustBeEqual = (value: string) => value === formData.password;
    const rules = {
      firstName: {
        required: helpers.withMessage('Should not be empty', required),
      },
      lastName: {
        required: helpers.withMessage('Should not be empty', required),
      },
      email: {
        required: helpers.withMessage('Should not be empty', required),
        email: helpers.withMessage('Should be an email', email),
      },
      password: {
        required: helpers.withMessage('Password is required', required),
      },
      confirmPassword: {
        required: helpers.withMessage('Confirmation is required', required),
        equal: mustBeEqual,
      },
    };

    const v$ = useVuelidate(rules, formData);
    const submitForm = async () => {
      await v$.value.$validate();
      const isInValid = v$.value.$invalid;
      if (isInValid) {
        return;
      }

      formData.email = '';
      formData.password = '';
      formData.firstName = '';
      formData.lastName = '';
      formData.confirmPassword = '';
      v$.value.$reset();
      context.emit('closeDialog');
    };
    return { formData, submitForm, v$ };
  },
});
</script>

<style lang="scss" scoped>
.container {
  min-width: 300px;
  display: flex;
  flex-direction: column;
}
.button {
  margin-left: auto;
}

.field {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
