<template>
  <div class="main">
    <Card 
      :title="'Este es un titulo un poco largo de una noticia jejeje'"
      :content="'Un algo muy largo pero pues es lo que hay jajaja alorem ipsum dolorus no se que mas poner para que esto sea realmente lago, igual y deberia de poner solo cosas random pero ya veremos dijo el ciego jajajaja'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/Card/Card.vue';
export default defineComponent({
  name: 'HelloWorld',
  components: {
    Card,
  },
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss">
</style>
