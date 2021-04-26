<template>
    <div class="card">
        <div class="card__wrapper">
            <h3 class="card__title">{{title}}</h3>
            <div class="card__separator"></div>
            <p class="card__content">{{content}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            required: false,
            default: 'Card Title'
        },
        content: {
            type: String,
            required: false,
            default: 'Card Content'
        },
    },
    setup () {
        return {}
    }
})
</script>

<style lang="scss">
@import './card';
</style>