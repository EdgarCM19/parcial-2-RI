<template>
    <div class="input-file-wrapper" :class="{'clickme': loaded}">
        <div>Documento selecionado: {{file_path}}</div>
        <input class="input-file" type="file" id="my-file" @change="loadFromFile"
        @click="() => loaded = false" >
        <label for="my-file" class="input-file-trigger">{{placeholder}}</label>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    props:{
        placeholder: {
            type: String,
            required: true,
            default: 'Select file',
        },
    },
    setup(_props: any, { emit }: any) {
        const file_path = ref('');
        const loaded = ref(true);
        function loadFromFile(event: any){
            const file = event.target.files[0];
            file_path.value = event.target.files[0].name;
            console.log(file_path.value)
            const reader = new FileReader();
            reader.onload = e => emit('load', e.target?.result);
            reader.readAsText(file);
        }
        return {
            loadFromFile,
            file_path,
            loaded
        };
    }
}
</script>>

<style lang="scss">
@import './inputfile';
</style>