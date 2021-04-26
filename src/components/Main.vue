<template>
    <div>
        <InputText :placeholder="'Ingrese su nombre'" v-model="nombrePersona" :value="nombrePersona"/>
        <Button :text="'Boton de prueba'" :onClickFunction="saludarPersona"/>
        <div class="noticias">
            <!-- <Card v-for="(item, index) in noticias" :key="item.id" /> -->
            <Card v-for="item in noticias" :key="item.id" :title="item.titulo" :content="item.contenido"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from '@/components/Button/Button.vue';
import InputText from '@/components/InputText/InputText.vue';
import Card from '@/components/Card/Card.vue';

export default defineComponent({
    components: {
        Button,
        InputText,
        Card,
    },
    setup() {
        const nombrePersona = ref('');
        const noticias = [
            {id: 0, titulo: 'Noticia 1', contenido: 'Algo random'},
            {id: 1, titulo: 'Noticia 2', contenido: 'Algo random'},
            {id: 2, titulo: 'Noticia 3', contenido: 'Algo random'},
            {id: 3, titulo: 'Noticia 4', contenido: 'La noticia 4 es la unica diferente'},
            {id: 4, titulo: 'Noticia 5', contenido: 'Algo random'},
            {id: 5, titulo: 'Noticia 6', contenido: 'Algo random'},
        ];

        const saludar = () => {
            alert('Esto es un saludo');
        };

        const saludarPersona = () => {
            alert(`Hola ${nombrePersona.value}, como estas`);
        }
        return {
            saludar,
            nombrePersona,
            saludarPersona,
            noticias,
        }
    }
})
</script>

<style>
.noticias {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>