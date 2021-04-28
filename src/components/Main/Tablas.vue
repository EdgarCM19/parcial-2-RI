<template>
    <div class="tables-content">
        <div class="corpus-table">
            <div class="corpus-title">Representacion TF-IDF de los documentos</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Termino</th>
                        <th v-for="doc in totalDocs" :key="doc">d<span class="index-min">{{doc}}</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="element in corpus_td_idf" :key="element.id">
                        <td> {{ element.id + 1 }}</td>
                        <td> {{ element.term }}</td>
                        <td v-for="(num, index) in element.weights" :key="index">
                            {{ num }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="query-table">
            <div class="query-title">Representacion TF-IDF de la consulta</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Termino</th>
                        <th v-for="doc in totalDocsQ" :key="doc">d<span class="index-min">{{doc}}</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="element in query_tf_idf" :key="element.id">
                        <td> {{ element.id + 1 }}</td>
                        <td> {{ element.term }}</td>
                        <td v-for="(num, index) in element.weights" :key="index">
                            {{ num }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script lang="ts">
import { objTFIDF } from '@/tf-idf';
import { computed, defineComponent } from 'vue';


export default defineComponent({
    props: {
        corpus_td_idf: {
            type: Array as () => objTFIDF[],
            required: true,
        },
        query_tf_idf: {
            type: Array as () => objTFIDF[],
            required: true,
        },
    },
    setup(props) {
        const totalDocs = computed(() => {
            return props.corpus_td_idf[0]?.weights.length;
        })
        const totalDocsQ = computed(() => {
            return props.query_tf_idf[0]?.weights.length;
        })
        return {//so...ahora que sigue?----tas ahi? holaaaa Edgar estas ahi?
            totalDocs,
            totalDocsQ,
        }
    }
});
</script>

<style lang="scss">
@import './main';
</style>