<template>
    <v-app>
        <alert-elem />

        <v-main class="d-flex align-center justify-center pa-6">
            <router-view />
        </v-main>
    </v-app>
</template>
  
<script setup>

import AlertElem from '@/components/AlertElem.vue';

</script>
  