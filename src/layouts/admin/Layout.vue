<template>
    <alert-elem />

    <v-app>
        <v-main>
            <h1>Logado: {{ computed_authStore.user?.first_name }}</h1>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>

import AlertElem from '@/components/AlertElem.vue';
import { computed } from 'vue';
import { useAuthStore } from '@/store/user/auth';

/**
 * 
 * Props
 * 
 */

/**
 * 
 * Vars, Refs ands Reactives
 * 
 */

/**
 * 
 * Computeds
 */
const computed_authStore = computed(() => {
    return useAuthStore();
});

/**
 * Methods
 */

/**
 * 
 * Watchers
 * 
 */

/**
 * Created
 */

</script>
