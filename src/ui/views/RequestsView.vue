<template>
    <div class="g-container">
        <TransitionGroup name="requests" tag="div" class="g-rr-item">
            <GradientCard class="g-rr-item" v-for="(item, index) in items" v-bind:key="item.request.url"
                :method="item.request.method" :code="item.response.code">
                <RequestResponseBlock :metadata="item" :expanded="index == 0" />
            </GradientCard>
        </TransitionGroup>
        <ButtonComponent title="Show More from History" @click="loadMore" v-if="!isDepleted" />
    </div>
</template>

<script lang="ts" setup>
import { GeckoCompositor } from '@/composition/gecko-compositor';
import type { GeckoMetadata } from '@/domain/model/gecko-metadata';
import { onMounted, ref } from 'vue';
import GradientCard from '../components/GradientCard.vue';
import RequestResponseBlock from '../components/RequestResponseBlock.vue';
import ToolbarComponent from '../components/ToolbarComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

const facade = GeckoCompositor.getFacade()
const items = ref([] as GeckoMetadata[])
const isDepleted = ref(false)

async function loadMore(): Promise<void> {
    if (isDepleted.value) {
        return
    }
    const limit = 10
    const list = await facade.getMetadataList({ offset: items.value.length, limit: limit })
    items.value = [...items.value, ...list]
    isDepleted.value = list.length < limit
}

async function refresh(): Promise<void> {
    items.value = await facade.getMetadataList({ limit: 1 })
}

onMounted(() => {
    refresh()
    window.onscroll = () => {
        const isAtBottom = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
        if (isAtBottom) {
            loadMore()
        }
    }
    window.onscroll.call(window, new Event("scroll"))
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
</style>