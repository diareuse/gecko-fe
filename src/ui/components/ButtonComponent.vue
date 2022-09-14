<template>
    <a :class="size">{{title}}</a>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

export declare type ButtonSize = "small" | "regular" | "large"
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    size: {
        type: String as PropType<ButtonSize>,
        required: false,
        default: "regular"
    }
})
</script>

<style scoped>
a {
    font-weight: 800;
    cursor: pointer;
    border-radius: 1000px;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    text-decoration: none;
}

a:disabled {
    cursor: not-allowed;
}

.small {
    font-size: 14px;
    line-height: 14px;
    padding: 6px 12px;
}

.regular {
    font-size: 16px;
    line-height: 16px;
    padding: 8px 16px;
}

.large {
    font-size: 18px;
    line-height: 18px;
    padding: 10px 20px;
}
</style>