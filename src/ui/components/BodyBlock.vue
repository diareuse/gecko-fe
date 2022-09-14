<template>
    <div>
        <div class="g-card">
            <h3>Headers</h3>
            <pre v-html="headers"></pre>
        </div>

        <div class="g-card">
            <h3>Content Type</h3>
            <pre v-html="contentType"></pre>
        </div>

        <div class="g-card">
            <h3>Body</h3>
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
    }
})
</script>

<style scoped>
.g-card {
    background-color: var(--color-surface-variant);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
}

.g-card>h3 {
    position: absolute;
    top: 0;
    font-size: 16px;
    font-weight: 800;
    background-color: var(--color-surface);
    padding: 4px 8px;
    line-height: 16px;
    margin-top: -10px;
    border-radius: 10000px;
}

.g-card:first-child {
    margin-top: 16px;
}

pre {
    font-size: 14px;
    line-height: 18px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

pre::-webkit-scrollbar {
    display: none;
}
</style>