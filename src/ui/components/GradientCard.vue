<template>
    <div class="g-background" :style="`--g-card-method: ${methodColor}; --g-card-code: ${codeColor}`">
        <div class="g-overhead">
            <span class="g-method">{{method}}</span>
            <div />
            <span class="g-code">{{code}}</span>
        </div>
        <div class="g-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { findProp } from '@vue/compiler-core';
import { computed } from '@vue/reactivity';

const props = defineProps({
    method: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    }
})

const methodColor = computed(() => {
    switch (props.method.toLowerCase()) {
        case "get": return "#89D1B6"
        case "head": return "#5658D3"
        case "post": return "#4E9FFA"
        case "put": return "#9EA4B4"
        case "delete": return "#FD7D78"
        case "connect": return "#D68EF0"
        case "options": return "#E2CA8C"
        case "trace": return "#91E074"
        case "patch": return "#9F7685"
        default: return "transparent"
    }
})

const codeColor = computed(() => {
    if (props.code >= 200 && props.code <= 299) return "#B9F6CA"
    else if (props.code >= 300 && props.code <= 399) return "#84FFFF"
    else if (props.code >= 400 && props.code <= 499) return "#FFE57F"
    else if (props.code >= 500 && props.code <= 599) return "#FF8A80"
    else return "black"
})
</script>

<style scoped>
.g-background {
    border-radius: 20px;
    background: linear-gradient(90deg, var(--g-card-method), var(--g-card-code) 100%);
    padding: 8px;
}

.g-overhead {
    display: flex;
    flex-direction: row;
    padding: 0 16px;
}

.g-overhead>div {
    flex-grow: 1;
}

.g-content {
    border-radius: 16px;
    background: var(--color-background);
    margin-top: 8px;
}

.g-method {
    font-weight: 800;
    mix-blend-mode: difference;
}

.g-code {
    font-weight: 800;
    mix-blend-mode: difference;
}
</style>