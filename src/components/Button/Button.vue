<template>
    <button class="btn" :class="{ 'expand' : expand }"
        :style="style"
        @click="onClickFunction"
    >
        <Icon v-if="icon" class="btn-icon"
            :type="icon"
            :color="color"
            :width="size"
            :height="size"
        />
        <span class="btn-text">{{ text }}</span>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Icon from '@/components/Icon/Icon.vue';

export default defineComponent({
    components: {
        Icon,
    },
    props: {
        text: {
            type: String,
            required: false,
        },
        icon: {
            type: String,
            required: false,

        },
        color: {
            type: String,
            required: false,
            default: 'currentColor'
        },
        size: {
            type: Number,
            required: false,
            default: 16,
        },
        expand: {
            type: Boolean,
            required: false,
            default: false,
        },
        onClickFunction: {
            type: Function,
            required: true,
        }
    },
    setup(props) {
        const style = computed(() => {
            return {
                // width: (props.expand) ? `${ props.size * 2}px` : 'auto',
                // height: (props.expand) ? `${ props.size * 2}px` : 'auto',
                fontSize: `${ props.size}px`,
                color: props.color,
            }
        });
        return {
            style,
        }
    }
});
</script>

<style lang="scss">
@import '_button.scss';
</style>
