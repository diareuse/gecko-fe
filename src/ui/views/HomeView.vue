<template>
    <div>
        <a @click="loadMore">Refresh</a>
        <GradientCard class="g-rr-item" v-for="(item, index) in items" v-bind:key="item.request.url"
            :method="item.request.method" :code="item.response.code">
            <RequestResponseBlock :metadata="item"  :expanded="index == 0" />
        </GradientCard>
        <a @click="loadMore">Load More</a>
    </div>
</template>

<script lang="ts" setup>
import { GeckoCompositor } from '@/composition/gecko-compositor';
import type { GeckoMetadata } from '@/domain/model/gecko-metadata';
import { onMounted, ref } from 'vue';
import GradientCard from '../components/GradientCard.vue';
import RequestResponseBlock from '../components/RequestResponseBlock.vue';

const facade = GeckoCompositor.getFacade()
const items = ref([] as GeckoMetadata[])

async function loadMore(): Promise<void> {
    const list = await facade.getMetadataList({ offset: items.value.length })
    items.value = [...items.value, ...list]
}

async function refresh(): Promise<void> {
    items.value = await facade.getMetadataList({})
}

onMounted(() => {
    refresh()
})
</script>

<style scoped>
.g-rr-item {
    margin-top: 16px;
}

.g-rr-item:first-child {
    margin-top: 0;
}
</style>