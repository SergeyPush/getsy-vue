<template>
  <form class="container" @submit.prevent="submitForm">
    <div class="field">
      <label for="username2">Username</label>
      <InputText
        id="email"
        type="text"
        aria-describedby="username2-help"
        class="p-inputtext-sm input"
        autocomplete="off"
        v-model.lazy="formData.email"
      />
      <small id="email-help" class="p-error"> Username is required </small>
    </div>
    <div class="field">
      <label for="username2">Password</label>
      <InputText
        id="password"
        type="password"
        aria-describedby="username2-help"
        class="p-inputtext-sm"
        v-model.lazy="formData.password"
      />
      <small id="password-help" class="p-error"> Password is required </small>
    </div>
    <Button
      type="submit"
      label="Log in"
      class="p-button-sm p-button-outlined p-button-text button"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { AuthType } from '../../types/auth.interface';

export default defineComponent({
  components: { InputText, Button },
  setup() {
    const formData = <AuthType>reactive({
      email: '',
      password: '',
    });

    const submitForm = () => {
      console.log(formData);
      formData.email = '';
      formData.password = '';
    };
    return { formData, submitForm };
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
