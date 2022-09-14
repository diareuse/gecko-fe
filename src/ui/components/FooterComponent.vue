<template>
    <footer>
        <div class="g-row">
            <a href="https://github.com/diareuse/gecko" target="_blank">
                <img class="g-badge"
                    src="https://img.shields.io/github/stars/diareuse/gecko?color=%23e27f86&label=gecko&style=flat-square" />
            </a>
            <a href="https://github.com/diareuse/gecko-fe" target="_blank">
                <img class="g-badge"
                    src="https://img.shields.io/github/stars/diareuse/gecko-fe?color=%23e27f86&label=gecko-fe&style=flat-square" />
            </a>
            <a href="https://github.com/diareuse" target="_blank">
                <img class="g-badge"
                    src="https://img.shields.io/github/followers/diareuse?label=Followers&style=flat-square" />
            </a>

        </div>
        <div class="g-row">
            <img class="logo" src="https://avatars.githubusercontent.com/u/5982859" />
            <span>Copyright © {{year}} <a href="https://github.com/diareuse" class="g-mono"
                    target="_blank">diareuse</a></span>
        </div>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.g-row>* {
    margin-left: 4px;
    margin-right: 4px;
}

.g-row {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
}

.logo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.g-badge {
    border-radius: 8px;
}

a {
    text-decoration: none;
    color: var(--color-primary);
    font-weight: 800;
}
</style>