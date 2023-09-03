<template>
    <v-container v-if="!['admin.home'].includes(route.name)" class="mt-2 mt-md-3 d-flex align-center justify-space-between">
        <div class="d-flex flex-column flex-md-row align-start align-md-center">
            <h1 class="text-h6 text-md-h5 mr-2">{{ props.pageTitle }}</h1>
            <v-breadcrumbs density="compact"
                :items="data.breadcrumbs.map(b => { return { title: b.text, to: b.to, disabled: b.disabled } })"
                class="px-0 px-md-4" />
        </div>

        <!-- actions -->
        <div>
            <v-btn-group density="compact">
                <v-btn v-if="props.createAction?.show && props.createAction?.to || props.createAction?.callback" @click.stop="method_createAction"
                    :color="props.createAction?.color ?? 'success'" :prepend-icon="props.createAction?.icon ?? 'mdi-plus'"
                    :text="props.createAction?.text ?? 'Novo'" />
            </v-btn-group>
        </div>
    </v-container>

    <template v-if="data.loading">
        <div class="text-center py-2">
            <v-progress-circular indeterminate :size="40" :width="5" color="primary" />
        </div>
    </template>
    <template v-else>
        <v-container>
            <slot name="content" />
        </v-container>
    </template>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

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
    createAction: {
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

const router = useRouter();

const route = useRoute();

const data = ref({
    loading: true,
    loadedContents: [],
    breadcrumbs: []
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

const method_createAction = () => {
    if (props.createAction?.to) {
        router.push(props.createAction.to);
        return;
    }

    props.createAction?.callback();
}

const method_setTitlebar = (breadcrumbs) => {
    document.title = '[' + appStore.getName + (appStore.getSubname ? ' ' + appStore.getSubname : '') + '] ' + breadcrumbs.map((bread) => {
        return bread.text;
    }).join(' » ');
}

/**
 * 
 * Watchers
 * 
 */
watch(() => props.requests, () => {
    method_loadContents();
}, { deep: true, immediate: true });

watch(() => props.pageBreadcrumbs, (nv) => {
    if (appStore.inAdmin) {
        data.value.breadcrumbs = [
            {
                text: 'Início',
                to: {
                    name: appStore.inAdmin ? 'admin.home' : ''
                },
                disabled: false
            },
            ...nv
        ];
    } else {
        data.value.breadcrumbs = nv;
    }
}, { deep: true, immediate: true });

watch(() => data.value.loadedContents, (nv) => {
    if (nv.length == props.requests.length) {
        data.value.loading = false;
    }
}, { deep: true });

watch(() => data.value.breadcrumbs, (nv) => {
    method_setTitlebar(nv);
}, { deep: true, immediate: true });

/**
 * Created
 */

</script>
