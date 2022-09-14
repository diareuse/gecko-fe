<template>
    <div class="g-block">
        <div class="g-action">
            <div class="g-url" v-html="url" />
            <div class="g-divider"></div>
            <IconExpand class="clickable animated" @click="isVisible=!isVisible" :class="isVisible ? 'active' : ''" />
        </div>
        <Transition name="default">
            <div class="g-container" v-if="isVisible">
                <BodyBlock class="g-body" :headers="metadata.request.headers.join('\n')"
                    :content-type="metadata.request.contentType"
                    :body="prettyJson(takeUnlessBlank(metadata.request.body)) ?? ''" />
                <div class="g-divider"></div>
                <BodyBlock class="g-body" :headers="metadata.response.headers.join('\n')"
                    :content-type="metadata.response.contentType"
                    :body="prettyJson(takeUnlessBlank(metadata.response.body)) ?? ''" />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import BodyBlock from "./BodyBlock.vue";
import type { GeckoMetadata } from "@/domain/model/gecko-metadata";
import type { PropType } from "vue";
import { computed, ref } from "@vue/reactivity";
import IconExpand from "./icons/IconExpand.vue";

const props = defineProps({
    metadata: {
        type: Object as PropType<GeckoMetadata>,
        required: true
    },
    expanded: {
        type: Boolean,
        required: false,
        defaultValue: false
    }
})
const isVisible = ref(props.expanded)

function prettyJson(json: string | null) {
    if (json) {
        try {
            json = JSON.parse(json)
        } catch (err) {
            return json
        }
    } else {
        return json
    }
    json = JSON.stringify(json, undefined, 2);
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        } else if (/\d+.?\d+/.test(match)) {
            cls = 'number'
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function takeUnlessBlank(item: string | null): string | null {
    if (!item) return null
    if (item.replace(RegExp("\w"), "").length == 0) return null
    return item as string
}

const url = computed(() => {
    const urlRegex = /\/\/([a-zA-Z\.0-9\-\_]+)\//
    const url = props.metadata.request.url
    const results = urlRegex.exec(url)
    if (!results) {
        return url
    }
    return url.replace(results[1], `<strong>${results[1]}</strong>`)
})
</script>

<style scoped>
.g-block {
    padding: 0 16px;
}

.g-container {
    display: flex;
    flex-direction: row;
}

.g-container>.g-body {
    flex-basis: 50%;
    overflow-x: hidden;
}

.g-divider {
    width: 16px
}

.g-url {
    font-size: 12px;
    background: var(--color-surface-variant);
    padding: 8px 16px;
    border-radius: 10000px;
}

.g-action {
    padding: 16px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.g-action>* {
    flex-wrap: wrap;
}

.g-action>.g-divider {
    flex-grow: 1;
}

.active {
    transform: rotate(180deg)
}

.default-enter-active {
    animation: reveal 0.5s ease-in-out;
}

.default-leave-active {
    animation: reveal 0.5s ease-in-out reverse;
}

@keyframes reveal {
    0% {
        opacity: 0;
        max-height: 0px;
    }

    100% {
        opacity: 1;
        max-height: 1000px;
    }
}
</style>