<template>
  <div class="main">
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Main from '@/components/Main/Main.vue';

export default defineComponent({
  name: 'App',
  components: {
    Main,
  },
});
</script>

<style lang="scss">
@import './styles/app';
</style>
