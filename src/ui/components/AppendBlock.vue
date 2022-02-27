<template>
    <div class="append-parent">
        <h1>It seems that this link is incomplete.</h1>
        <label>You can enter the remaining content here:</label>
        <textarea v-model="area" id="append-input-box"></textarea>
        <button @keyup.enter="onDone" v-on:click="onDone">Done!</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    data() {
        const area = ref('')
        return {
            area
        }
    },
    mounted() {
        document.getElementById("append-input-box")?.focus()
    },
    methods: {
        onDone() {
            window.location.assign(window.location.href + this.area)
        }
    }
})
</script>

<style scoped>
textarea {
    min-width: 300px;
    background: var(--color-background-mute);
    color: var(--color-text);
    border-radius: 1rem;
    border: solid transparent;
    padding: 0.5rem 1rem;
}
button {
    padding: 0.5rem 1rem;
    background-color: var(--color-background-mute);
    color: var(--color-text);
    border-radius: 1rem;
    border: solid transparent;
    cursor: pointer;
    font-weight: 800;
}
.append-parent {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    align-items: center;
}
.append-parent > * {
    flex-grow: 1;
    flex-basis: 0;
}
</style>