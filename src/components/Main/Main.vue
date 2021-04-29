<template>
    <div class="search-container">
        <div class="search-inputs">
            <InputText
                :placeholder="'Ingrese su busqueda'"
                :value="query"
                v-model="query"
            />
            <Button
                :text="'Buscar'"
                :onClickFunction="execQuery"
            />
            <Button
                :text="'Reiniciar'"
                :onClickFunction="reset"
            />
        </div>
        <InputFile 
            :placeholder="'Seleccione un archivo'"
            @load="loadFile"
        />
    </div>
    <div class="tabs-items">
        <Radio
            :optionsList="tabsOptions"
            :value="tabOption"
            v-model="tabOption"
        />
    </div>
    <div class="tab-content">
        <Noticias :iterable="newsList" v-show="tabOption === 'Noticias'"/>
        <Tablas :corpus_td_idf="corupus_tf_idf" :query_tf_idf="query_tf_idf" v-show="tabOption === 'Tablas'"/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Button from '@/components/Button/Button.vue';
import InputText from '@/components/InputText/InputText.vue';
import Radio from '@/components/Radio/Radio.vue';
import InputFile from '@/components/InputFile/InputFile.vue';

import Noticias from '@/components/Main/Noticias.vue';
import Tablas from  '@/components/Main/Tablas.vue';
import { getCorpus, getQueryWeights, getWords, get_tf_idf, objDocWeight, objNoticia, objTFIDF, preprocessDocument } from '@/tf-idf';

export default defineComponent({
    components: {
        Button,
        InputText,
        Noticias,
        Tablas,
        Radio,
        InputFile,
    },
    setup() {
        //------[VARIABLES]------
        //Variable encargada de manejar la entrada de texto
        const query = ref<string>('');
        const input_corpus = ref<objNoticia[]>([]);
        const corupus_tf_idf = ref<objTFIDF[]>([]);
        const query_tf_idf = ref<objTFIDF[]>([]);
        const results = ref<objNoticia[]>([]);

        const tabsOptions = ['Noticias', 'Tablas'];
        const tabOption = ref<string>('Noticias');

        const newsList = computed(() => {
            return (results.value.length > 0) ? results.value : input_corpus.value;
        });

        //------[FUNCIONES]------
        const loadFile = (event: string) => { 
            const file_content = event;
            input_corpus.value = getCorpus(file_content);
            const local_corpus_tf_idf = localStorage.getItem('corpus-tf-idf');
            corupus_tf_idf.value = (local_corpus_tf_idf === null) ?
                get_tf_idf(input_corpus.value, getWords(input_corpus.value)):
                JSON.parse(local_corpus_tf_idf);
            if(local_corpus_tf_idf === null) localStorage.setItem('corpus-tf-idf', JSON.stringify(corupus_tf_idf.value));
            console.log(input_corpus.value.length);
        }
        
        const execQuery = () => {
            query_tf_idf.value = [];
            results.value = [];
            const query_words = preprocessDocument(query.value).split(' ').filter(x => !x.match(/\s+/g));
            console.log('Consulta: ', query_words);
            query_tf_idf.value = get_tf_idf(input_corpus.value, query_words);
            const query_weights = getQueryWeights(query_tf_idf.value).sort((a, b) => b.weight - a.weight);
            results.value = getQueryResults(query_weights.filter(x => x.weight > 0));
            if(results.value.length <= 0) {
                alert('No se encontro alguna coincidencia con lo buscado');
                query.value = '';
            }
        }

        const reset = () => {
            query_tf_idf.value = [];
            results.value = [];
            query.value = '';
        }

        const getQueryResults = (weights: objDocWeight[]): objNoticia[] => {
            const temp: objNoticia[] = [];
            for(let i = 0; i < weights.length; i++)
                temp.push(input_corpus.value[weights[i].id]);
            return temp;
        }

        return {
            query,
            input_corpus,
            results,
            tabsOptions,
            tabOption,
            reset,
            execQuery,
            loadFile,
            newsList,
            corupus_tf_idf,
            query_tf_idf,
        }
    }
})
</script>

<style lang="scss">
@import './main';
</style>