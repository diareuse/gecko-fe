<template>
    <header class="g-accent-bg">
        <img src="@/ui/assets/icons/logo.png" />
        <h1>Gecko!</h1>
    </header>
</template>

<script lang="ts" setup>

</script>

<style scoped>
header {
    display: flex;
    width: 100%;
    border-radius: 16px;
    margin-top: 48px;
    background-color: var(--color-background);
    padding: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

header>* {
    flex-wrap: wrap;
    margin-left: 16px;
}

header>*:first-child {
    margin-left: 0px;
}

img {
    width: 48px;
    height: 48px;
}

.g-accent-bg::after {
    content: '';
    width: calc(100% + 16px);
    height: calc(100% + 32px);
    z-index: -1;
    margin-bottom: 16px;
    border-radius: 20px;
    position: absolute;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
}
</style>