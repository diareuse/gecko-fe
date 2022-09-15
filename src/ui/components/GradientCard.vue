<template>
    <div class="g-background" :style="`--g-card-left: ${colorLeft}; --g-card-right: ${colorRight}`">
        <div class="g-overhead" v-if="left || right">
            <span class="g-left" v-if="left">{{left}}</span>
            <div />
            <span class="g-right" v-if="right">{{right}}</span>
        </div>
        <div class="g-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { findProp } from '@vue/compiler-core';
import { computed } from '@vue/reactivity';
import type { PropType } from 'vue';

const props = defineProps({
    left: {
        type: String,
        required: false,
        default: null
    },
    right: {
        type: String,
        required: false,
        default: null
    },
    colorLeft: {
        type: String,
        required: false,
        default: "var(--color-primary)"
    },
    colorRight: {
        type: String,
        required: false,
        default: "var(--color-primary)"
    }
})
</script>

<style scoped>
.g-background {
    border-radius: 20px;
    background: linear-gradient(90deg, var(--g-card-left), var(--g-card-right) 100%);
    padding: 8px;
}

.g-overhead {
    display: flex;
    flex-direction: row;
    padding: 0 16px;
    min-height: 16px;
}

.g-overhead>div {
    flex-grow: 1;
}

.g-content {
    border-radius: 16px;
    background: var(--color-surface);
    margin-top: 8px;
}

.g-left {
    font-weight: 800;
    color: black;
    mix-blend-mode: var(--blend-mode);
}

.g-right {
    font-weight: 800;
    color: black;
    mix-blend-mode: var(--blend-mode);
}
</style>