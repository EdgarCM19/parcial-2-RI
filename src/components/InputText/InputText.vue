<template>
  <div class="input-wrapper">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="input_val"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, { emit }) {
    const value_handler = {
      get() {
        return props.value;
      },
      set(val: string) {
        emit('update:modelValue', val);
      },
    };
    const input_val = computed(value_handler);

    return {
      input_val,
    };
  },
});
</script>

<style lang="scss">
@import './inputtext';
</style>