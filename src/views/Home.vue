<template>
	<v-container class="fill-height">
		<v-responsive class="align-center text-center fill-height">
			<v-img height="300" src="@/assets/logo.svg" />

			<div class="text-body-2 font-weight-light mb-n1">Bem vindo(a) ao</div>

			<h1 class="text-h2 font-weight-bold">{{ computed_appStore.getName }}</h1>

			<div class="py-14" />

			<v-row class="d-flex align-center justify-center">
				<v-col cols="auto">
					<v-btn :to="{ name: 'auth.login' }" color="primary" variant="elevated" prepend-icon="mdi-login"
						size="large">
						Login
					</v-btn>
				</v-col>
				<v-col cols="auto">
					<v-btn :to="{ name: 'auth.register' }" color="primary" variant="elevated" prepend-icon="mdi-account"
						size="large">
						Register
					</v-btn>
				</v-col>
			</v-row>
		</v-responsive>
	</v-container>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { computed } from 'vue';

useAppStore().updateTitleBar('Bem vindo');

/**
 * Computeds
 */
const computed_appStore = computed(() => {
	return useAppStore();
});

</script>