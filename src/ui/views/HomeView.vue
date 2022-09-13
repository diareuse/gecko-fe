<template>
    <div>
        <a @click="loadMore">Refresh</a>
        <GradientCard v-for="item in items" v-bind:key="item.request.url" :method="item.request.method"
            :code="item.response.code">
            <RequestResponseBlock :metadata="item" />
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

</style>