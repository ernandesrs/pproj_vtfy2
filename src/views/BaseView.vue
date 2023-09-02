<template>
    <slot name="content" />
</template>

<script setup>

import { useAppStore } from '@/store/app';

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
    }
});

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
useAppStore().setBreadcrumbs(props.pageBreadcrumbs);
useAppStore().setPageTitle(props.pageTitle);

</script>
