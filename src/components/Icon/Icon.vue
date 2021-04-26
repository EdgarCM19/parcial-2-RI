<template>
    <div :style="iconStyle">
        <svg
            :width="`${width}px`"
            preserveAspectRadio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <g>
                <path :fill="color" :d="path" />
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ICONS from './icons';

export default defineComponent({
    props: {
        type: {
            type: String,
            requierd: true,
            default: 'code',
        },
        color: {
            type: String,
            required: false,
            default: 'currentColor',
        },
        width: {
            type: Number, String,
            required: false,
            default: 16,
        },
        height: {
            type: Number, String,
            required: false,
            default: 16,
        }
    },
    setup(props) {
        const iconStyle = computed(() => {
            return {
                width: `${ props.width }px`,
                height: `${ props.height }px`,
            }
        });

        const path = computed((): string => {
            return ICONS[props.type];
        })
        return {
            iconStyle,
            path
        }
    }
});
</script>

<style >

</style>