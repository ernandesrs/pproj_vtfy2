<template>
    <alert-elem />

    <v-app>
        <v-main class="d-flex align-center justify-center pa-6">
            <v-row justify="center">
                <v-col cols="12" lg="10">
                    <v-row>
                        <v-col cols="12" md="6" class="bg-primary text-center">
                            <v-icon icon="$vuetify" size="200" />
                            <h1>
                                {{ computed_appStore.getName }}
                            </h1>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card elevation="0" class="pa-4">
                                <v-card-item>
                                    <router-view />
                                </v-card-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>
  
<script setup>

import AlertElem from '@/components/AlertElem.vue';
import { useAppStore } from '@/store/app';
import { computed } from 'vue';

/**
 * Computed
 */
const computed_appStore = computed(() => {
    return useAppStore();
});

</script>
  