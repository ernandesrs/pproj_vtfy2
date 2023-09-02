<template>
    <div></div>
</template>

<script setup>

import { useAppStore } from '@/store/app';

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
 * 

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
useAppStore().setBreadcrumbs([
    {
        text: 'Perfil',
        to: { name: 'admin.profile' },
        disabled: true
    }]);
useAppStore().setPageTitle('Meu perfil');

</script>

<style lang="scss" scoped></style>