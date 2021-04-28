<template>
    <div class="news-wrapper">
        <Card v-for="item in iterable" 
            :key="item.id"
            :title="item.title"
            :content="item.content"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/Card/Card.vue';
import { objNoticia } from '@/tf-idf';

export default defineComponent({
    props: {
        iterable: {
            type: Array as () => objNoticia[],
            required: true,
        },
    },
    components: {
        Card,
    },
    setup () {
         const noticias = [
            {id: 0, titulo: 'Noticia 1', contenido: 'Algo random'},
            {id: 1, titulo: 'Noticia 2', contenido: 'Algo random'},
            {id: 2, titulo: 'Noticia 3', contenido: 'Algo random'},
            {id: 3, titulo: 'Noticia 4', contenido: 'La noticia 4 es la unica diferente'},
            {id: 4, titulo: 'Noticia 5', contenido: 'Algo random'},
            {id: 5, titulo: 'Noticia 6', contenido: 'Algo random'},
            {id: 6, titulo: 'Noticia 7', contenido: 'Algo random'},
            {id: 7, titulo: 'Noticia 8', contenido: 'Algo random'},
            {id: 8, titulo: 'Noticia 9', contenido: 'Algo random'},
            {id: 9, titulo: 'Noticia 10', contenido: 'Algo random'},
        ];
        return {
            noticias
        }
    }
});
</script>

<style lang="scss">

</style>