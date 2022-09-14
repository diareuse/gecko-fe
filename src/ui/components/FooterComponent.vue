<template>
    <footer>
        <img src="https://avatars.githubusercontent.com/u/5982859" />
        <span>Copyright © {{year}} <a href="https://github.com/diareuse" class="g-mono">diareuse</a></span>
    </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const year = computed(() => {
    return new Date().getFullYear()
})
</script>

<style scoped>
footer {
    min-height: 48px;
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

footer>* {
    margin-left: 4px;
    margin-right: 4px;
}

img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

a {
    text-decoration: none;
    color: var(--color-primary);
    font-weight: 800;
}
</style>