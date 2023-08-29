<template>
    register
</template>

<script setup>

import { useAppStore } from '@/store/app';

useAppStore().updateTitleBar('Cadastro');

</script>
