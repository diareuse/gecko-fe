<template>
    <div class="g-container">
        <TransitionGroup name="requests" tag="div" class="g-rr-item">
            <GradientCard class="g-rr-item" v-for="(item, index) in items" v-bind:key="item.request.url"
                :method="item.request.method" :code="item.response.code">
                <MultiMetadataComponent :metadata="item" :expanded="index == 0" @delete="deleteItem(item)" />
            </GradientCard>
        </TransitionGroup>
        <div class="g-empty" v-if="items.length <= 0 && !isLoading">
            <IconEmpty />
            <h6>This looks empty 🤔</h6>
            <p>You can start by clicking on links in logs or personal messages.<br>
                Optionally you can enter links on the home page.</p>
            <ButtonComponent title="Away we go!" href="/gecko/" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { GeckoCompositor } from '@/composition/gecko-compositor';
import type { GeckoMetadata } from '@/domain/model/gecko-metadata';
import { onMounted, ref } from 'vue';
import GradientCard from '../components/GradientCard.vue';
import MultiMetadataComponent from '../components/MultiMetadataComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import IconEmpty from '../components/icons/IconEmpty.vue';

const facade = GeckoCompositor.getFacade()
const items = ref([] as GeckoMetadata[])
const isDepleted = ref(false)
const isLoading = ref(true)

async function loadMore(): Promise<void> {
    if (isDepleted.value) {
        return
    }
    const limit = 10
    const list = await facade.getMetadataList({ offset: items.value.length, limit: limit })
    items.value = [...items.value, ...list]
    isDepleted.value = list.length < limit
    isLoading.value = false
}

async function refresh(): Promise<void> {
    items.value = await facade.getMetadataList({ limit: 10 })
    isLoading.value = false
}

async function deleteItem(item: GeckoMetadata) {
    await facade.delete(item)
    items.value = items.value.filter((it) => it !== item)
}

onMounted(() => {
    refresh()
    window.onscroll = () => {
        const isAtBottom = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
        if (isAtBottom) {
            loadMore()
        }
    }
})
</script>

<style scoped>
.g-rr-item {
    width: 100%;
}

.g-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.g-container>*,
.g-container>.g-rr-item>* {
    margin-top: 16px;
}

.requests-enter-active,
.requests-leave-active {
    transition: all 0.5s ease;
}

.requests-enter-from,
.requests-leave-to {
    opacity: 0;
    transform: translateY(24px);
}

.g-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-items: center;
    text-align: center;
    flex-grow: 1;
}

.g-empty>* {
    flex-wrap: wrap;
    margin-top: 24px;
}
</style>