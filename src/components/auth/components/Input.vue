<template>
  <div class="field">
    <label class="" :for="name">{{ label }}</label>
    <div class="control">
      <input
        :id="name"
        class="input is-success"
        :class="[error && 'is-danger']"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :name="name"
        @input="handleInput"
        autocomplete="off"
      />
    </div>
    <p class="help is-danger" v-if="error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: [
    'error',
    'value',
    'type',
    'placeholder',
    'errorMessage',
    'label',
    'name',
  ],
  setup(_, context) {
    const handleInput = (event: any) =>
      context.emit('update:value', event.target.value);
    return { handleInput };
  },
});
</script>

<style scoped lang="scss">
.field {
  width: 100%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
