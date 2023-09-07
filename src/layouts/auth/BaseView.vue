<template>
    <v-row justify="center">
        <v-col cols="12" sm="10" md="12" lg="10">
            <v-row justify="center">
                <v-col cols="12" sm="10" md="6" class="pa-4 d-flex flex-column justify-start align-center">
                    <slot name="image" />
                </v-col>
                <v-col cols="12" md="6">
                    <v-card elevation="0" border class="pa-6">
                        <v-card-item class="mb-3">
                            <h1 class="text-h4">{{ props.pageTitle }}</h1>
                        </v-card-item>
                        <v-card-item>
                            <slot name="form" />
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { onUpdated } from 'vue';

const props = defineProps({
    pageTitle: {}
});

const appStore = useAppStore();

/**
 * Methods
 */
const method_setTitlebar = () => {
    document.title = '[' + appStore.getName + (appStore.getSubname ? ' ' + appStore.getSubname : '') + '] ' + props.pageTitle;
}

method_setTitlebar();

onUpdated(() => {

    method_setTitlebar();

})

</script>