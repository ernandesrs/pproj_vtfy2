<template>
    <base-view page-title="Atualizar senha">

        <template #image>
            <v-img src="./../../assets/update-password.svg" width="100%" />
        </template>

        <template #form>
            <v-form v-model="form.valid" @submit.prevent="method_submit">
                <v-row>
                    <v-col cols="12">
                        <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password"
                            :error-messages="form.errors?.password" :rules="[validator.required, validator.password]"
                            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            @click:append-inner="showPassword = !showPassword" label="Senha" />
                    </v-col>

                    <v-col cols="12">
                        <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password_confirmation"
                            :error-messages="form.errors?.password" :rules="[validator.required, validator.password]"
                            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            @click:append-inner="showPassword = !showPassword" label="Confirmar senha" />
                    </v-col>

                    <v-col cols="12" class="d-flex align-center justify-center">
                        <v-btn type="submit" prepend-icon="mdi-check" text="Atualizar" color="primary" size="large"
                            :loading="form.submitting" />
                    </v-col>
                </v-row>
            </v-form>
        </template>
    </base-view>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import validator from '@/utils/validator';
import BaseView from '@/layouts/auth/BaseView.vue';
import { req } from '@/plugins/axios';
import { useRoute, useRouter } from 'vue-router';

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
const appStore = useAppStore();

const route = useRoute();

const router = useRouter();

const showPassword = ref(false);

const form = ref({
    valid: false,
    submitting: false,
    data: {
        token: null,
        password: null,
        password_confirmation: null
    },
    errors: {}
});

/**
 * 
 * Computeds
 * 

/**
 * Methods
 */
const method_getToken = () => {
    let token = route.query?.token;

    if (!token) {
        appStore.addAlert().danger('O token de atualização de senha é inválido ou inexistente, solicite um novo link.', 'Token inválido!', true);
        router.push({ name: 'auth.forget' });
        return;
    }

    form.value.data.token = token;
};

const method_submit = () => {
    if (!form.value.valid) {
        appStore.addAlert().missingData();
        return;
    }

    form.value.submitting = true;

    return req({
        action: '/auth/update-password',
        method: 'put',
        data: {
            token: form.value.data.token,
            password: form.value.data.password,
            password_confirmation: form.value.data.password_confirmation
        },
        success: () => {
            appStore.addAlert().success('Sua senha foi atualizada com sucesso, faça login!', 'Atualizada!', true);
            router.push({ name: 'auth.login' });
        },
        fail: (resp) => {
            form.value.errors = resp.response?.data?.errors;
        },
        finally: () => {
            form.value.submitting = false;
        }
    });
};

/**
 * 
 * Watchers
 * 
 */

/**
 * Created
 */
method_getToken();

</script>
