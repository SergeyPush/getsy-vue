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
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

export default defineComponent({
  components: { InputText, Button },
  setup(_, context) {
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
      console.log(formData);
      formData.email = '';
      formData.password = '';
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
