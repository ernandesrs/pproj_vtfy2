<template>
    <template v-if="data.loading">
        <div class="text-center py-2">
            <v-progress-circular indeterminate :size="40" :width="5" color="primary" />
        </div>
    </template>
    <template v-else>
        <slot name="content" />
    </template>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { watch } from 'vue';
import { ref } from 'vue';

/**
 * 
 * Props
 * 
 */
const props = defineProps({
    pageTitle: {
        type: String,
        default: 'Page Title'
    },
    pageBreadcrumbs: {
        type: Array,
        default: Array
    },
    pageCreateAction: {
        type: [Object, null],
        default: null
    },
    requests: {
        type: Array,
        default: Array
    }
});

/**
 * 
 * Vars, Refs ands Reactives
 * 
 */
const appStore = useAppStore();

const data = ref({
    loading: true,
    loadedContents: []
});

/**
 * 
 * Computeds
 * 

/**
 * Methods
 */
const method_loadContents = () => {
    if (props.requests.length == 0) {
        data.value.loading = false;
        return;
    }

    data.value.loadedContents = [];
    props.requests.map((funct) => {
        try {
            funct().finally(() => {
                data.value.loadedContents.push(true);
            });
        } catch {
            // 
        }
    });
}

/**
 * 
 * Watchers
 * 
 */
watch(() => props.requests, () => {
    method_loadContents();
}, { deep: true, immediate: true });

watch(() => data.value.loadedContents, (nv) => {
    if (nv.length == props.requests.length) {
        data.value.loading = false;
    }
}, { deep: true });

watch(() => props.pageCreateAction, (nv) => {
    appStore.setPageCreateAction(nv);
}, { deep: true, immediate: true });

/**
 * Created
 */
appStore.setBreadcrumbs(props.pageBreadcrumbs);
appStore.setPageTitle(props.pageTitle);

</script>
