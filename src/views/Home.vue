<template>
	<v-container class="fill-height">
		<v-responsive class="align-center text-center fill-height">
			<v-img height="300" src="@/assets/logo.svg" />

			<div class="text-body-2 font-weight-light mb-n1">Bem vindo(a) ao</div>

			<h1 class="text-h2 font-weight-bold">{{ computed_appStore.getName }}</h1>

			<div class="py-14" />

			<v-row class="d-flex align-center justify-center">
				<template v-if="!computed_authStore.isAuth">
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
				</template>
				<template v-else>
					<v-col cols="auto">
						<v-btn :to="{ name: 'admin.home' }" color="primary" variant="elevated" prepend-icon="mdi-chart-pie"
							size="large">
							Admin
						</v-btn>
					</v-col>
				</template>
			</v-row>
		</v-responsive>
	</v-container>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/user/auth';
import { computed } from 'vue';

/**
 * 
 * Computed
 * 
 */
const computed_appStore = computed(() => {
	return useAppStore();
});

const computed_authStore = computed(() => {
	return useAuthStore();
});

/**
 * 
 * Created
 * 
 */
useAppStore().setBreadcrumbs([
	{
		text: 'Bem vindo'
	}
]);

</script>