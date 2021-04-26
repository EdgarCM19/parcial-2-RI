<template>
    <div class="radio-input">
        <div class="element" v-for="(option, index) in optionsList" :key="index">
            <input type="radio" :name="option" :id="option" :value="option" v-model="selectedVal">
            <label :for="option">{{ option }}</label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
    props: {
        optionsList: {
            type: Array as () => string[],
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
    },
    setup(props, { emit }) {
        const valueHandler = {
            get() {
                return props.value;
            }, 
            set(val: string) {
                emit('update:modelValue', val);
            },
        }
    
        const sele = ref('');
        const selectedVal = computed(valueHandler);
        return {
            selectedVal,
            sele
        }
    }
});
</script>

<style lang="scss">
@import './radio';
</style>