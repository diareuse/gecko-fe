<template>
    <div class="g-component">
        <h5 class="g-visible-mobile">{{title}}</h5>

        <div class="g-card">
            <p>Headers</p>
            <pre v-html="headers"></pre>
        </div>

        <div class="g-card">
            <p>Content Type</p>
            <pre v-html="contentType"></pre>
        </div>

        <div class="g-card">
            <p>Body</p>
            <pre v-html="body"></pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    headers: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.g-component {
    overflow-y: hidden;
}

.g-card {
    background-color: var(--color-surface-variant);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 16px;
}

.g-card>p {
    position: absolute;
    top: 0;
    font-size: 14px;
    font-weight: 800;
    background-color: var(--color-surface);
    padding: 4px 8px;
    line-height: 14px;
    margin-top: calc(-14px/2 - 4px);
    margin-left: -8px;
    border-radius: 10000px;
}

.g-card:first-of-type {
    margin-top: 16px;
}

pre {
    font-size: 14px;
    line-height: 18px;
    overflow-y: hidden;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

pre::-webkit-scrollbar {
    display: none;
}

h5 {
    padding: 0 16px;
}
</style>