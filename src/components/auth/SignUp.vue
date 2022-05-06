<template>
  <form class="container" @submit.prevent="submitForm">
    <Input
      name="firstName"
      label="First name"
      :error="v$.firstName.$error"
      v-model:value="formData.firstName"
      placeholder="Enter first name"
      type="text"
      errorMessage="First name is required"
    />
    <Input
      name="lastName"
      label="Last name"
      :error="v$.lastName.$error"
      v-model:value="formData.lastName"
      placeholder="Enter last name"
      type="text"
      errorMessage="Last name is required"
    />
    <Input
      name="email"
      label="Email"
      :error="v$.email.$error"
      v-model:value="formData.email"
      placeholder="Enter email"
      type="email"
      errorMessage="Email is required"
    />
    <Input
      name="password"
      label="Password"
      :error="v$.password.$error"
      v-model:value="formData.password"
      placeholder="Enter password"
      type="password"
      errorMessage="Password is required"
    />
    <Input
      name="confirmPassword"
      label="Confirm Password"
      :error="v$.confirmPassword.$error"
      v-model:value="formData.confirmPassword"
      placeholder="Confirm password"
      type="password"
      errorMessage="Confirmation is required"
    />
    <article class="message is-danger" v-if="error">
      <div class="message-body m-body">
        {{ error }}
      </div>
    </article>
    <button
      class="button is-primary"
      type="submit"
      :class="[isLoading && 'is-loading']"
    >
      Sign Up
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store/auth';
import Input from './components/Input.vue';

export default defineComponent({
  components: { Input },
  setup(_, context) {
    const auth = useAuthStore();
    const { error, isLoading } = storeToRefs(auth);

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

      await auth.signUp(formData);
      if (auth.isAuthenticated) {
        formData.email = '';
        formData.password = '';
        formData.firstName = '';
        formData.lastName = '';
        formData.confirmPassword = '';
        v$.value.$reset();
        context.emit('closeDialog');
      }
    };
    onUnmounted(() => auth.clearError());
    return { formData, submitForm, v$, error, isLoading };
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

.message {
  max-width: 280px;
  min-width: 100%;
  margin-bottom: 10px;
}
</style>
