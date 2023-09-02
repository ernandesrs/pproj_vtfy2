<template>
    <base-view page-title="Dashboard" :page-breadcrumbs="[]" :requests="[
        method_getDashContent
    ]"></base-view>
</template>

<script setup>

import { req } from '@/plugins/axios';
import BaseView from '../BaseView.vue';
import { ref } from 'vue';

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
const data = ref({
    cards: {
        roles: null,
        users: null
    }
});

/**
 * 
 * Computeds
 * 

/**
 * Methods
 */
const method_getDashContent = () => {
    return req({
        action: '/admin',
        method: 'get',
        success: (resp) => {
            data.value.cards.roles = resp.data.roles;
            data.value.cards.users = resp.data.users;
        }
    });
}

/**
 * 
 * Watchers
 * 
 */

/**
 * Created
 */

</script>

<style lang="scss" scoped></style>