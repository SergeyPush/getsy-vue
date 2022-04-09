<template>
  <form class="container" @submit.prevent="submitForm">
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
    <InlineMessage severity="error" v-if="error" class="message">
      {{ error }}
    </InlineMessage>
    <Button
      type="submit"
      label="Log in"
      class="p-button-sm p-button-outlined p-button-text button"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, onUnmounted } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { useAuthStore } from '../../store/auth';
import { storeToRefs } from 'pinia';
import InlineMessage from 'primevue/inlinemessage';

export default defineComponent({
  components: { InputText, Button, InlineMessage },
  setup(_, context) {
    const auth = useAuthStore();
    const { error } = storeToRefs(auth);

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
    onUnmounted(() => auth.clearError());
    return { formData, submitForm, v$, error };
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
  max-width: 280px;
  width: 100%;
  margin-bottom: 10px;
}

.field {
  width: 100%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
