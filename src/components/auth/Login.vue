<template>
  <form class="container" @submit.prevent="submitForm">
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
    <article class="message is-danger" v-if="error">
      <div class="message-body">
        {{ error }}
      </div>
    </article>
    <button
      class="button is-primary"
      type="submit"
      :class="[isLoading && 'is-loading']"
    >
      Log In
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted, onDeactivated } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { useAuthStore } from '../../store/auth';
import { storeToRefs } from 'pinia';
import InlineMessage from 'primevue/inlinemessage';
import Input from './components/Input.vue';

export default defineComponent({
  components: { InlineMessage, Input },
  setup(_, context) {
    const auth = useAuthStore();
    const { error, isLoading } = storeToRefs(auth);

    const formData = reactive({
      email: '',
      password: '',
    });

    const rules = {
      email: {
        required: helpers.withMessage('Should not be empty', required),
        email: helpers.withMessage('Should be an email', email),
      },
      password: {
        required: helpers.withMessage('Password is required', required),
      },
    };

    const v$ = useVuelidate(rules, formData);

    const submitForm = async () => {
      await v$.value.$validate();
      const isInValid = v$.value.$invalid;
      if (isInValid) {
        return;
      }
      await auth.logIn(formData);
      if (auth.isAuthenticated) {
        formData.email = '';
        formData.password = '';
        v$.value.$reset();
        context.emit('closeDialog');
      }
    };

    const clear = () => {
      v$.value.$reset();
      auth.clearError();
    };
    onUnmounted(() => clear());
    onDeactivated(() => clear());
    return { formData, submitForm, v$, error, isLoading };
  },
});
</script>

<style lang="scss" scoped>
.container {
  min-width: 100%;
  display: flex;
  flex-direction: column;
}
.button {
  margin-left: auto;
}
.message {
  /* max-width: 280px; */
  width: 100%;
  margin-bottom: 10px;
}
input {
  width: 100%;
}
</style>
