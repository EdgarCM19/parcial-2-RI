<template>
    <div class="card">
        <div class="card__wrapper">
            <div class="card__title">{{title}}</div>
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
            required: true,
            default: 'Card Title'
        },
        content: {
            type: String,
            required: true,
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