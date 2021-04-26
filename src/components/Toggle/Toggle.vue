<template>
    <div class="theme-switch" :style="{ dark : store.getters.getTheme }">
        <input type="checkbox" id="switch" class="toggle">
        <label for="switch" class="toggle" @click="toggle">Toggle</label>
    </div>
</template>

<script lang="ts">
//To do: 
//[ ] Hacer el computed para el color del switch
import { defineComponent, inject } from 'vue'

export default defineComponent({
    props: {
        normalColor : {
            type: String,
            requiered: false
        },
        selectedColor: {
            type: String,
            required: false,
        },
        value: {
            type: Boolean,
            required: true,
        },
        function: {
            type: Function,
            required: false,
        }
    },
    setup(props, { emit }) {
        const store = inject('store');

        function toggle() {
            if(props.function){
                props.function();
            }
            emit('update:modelValue', !props.value);
        }
        return { toggle, store, };
    },
})
</script>

<style lang="scss">
@import '_toggle.scss';
</style>
