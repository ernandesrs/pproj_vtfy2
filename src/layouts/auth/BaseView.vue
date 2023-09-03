<template>
    <slot />
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { watch } from 'vue';

const props = defineProps({
    pageBreadcrumbs: {
        type: Array,
        default: Array
    }
});

const appStore = useAppStore();

/**
 * Methods
 */
const method_setTitlebar = (breadcrumbs) => {
    document.title = '[' + appStore.getName + (appStore.getSubname ? ' ' + appStore.getSubname : '') + '] ' + breadcrumbs.map((bread) => {
        return bread.text;
    }).join(' » ');
}

/**
 * Watchers
 */
watch(() => props.pageBreadcrumbs, (nv) => {
    method_setTitlebar(nv);
}, { deep: true, immediate: true });

</script>