<template>
    login
</template>

<script setup>

import { useAppStore } from '@/store/app';

useAppStore().updateTitleBar('Login');

</script>
