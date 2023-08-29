<template>
    <v-row justify="center">
        <v-col cols="12">
            <h1>Login</h1>
        </v-col>

        <v-col cols="12">
            <v-form v-model="form.valid" fast-fail @submit.prevent="method_login">
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="E-mail" v-model="form.data.email" :error-messages="form.errors?.email"
                            :rules="[validator.required, validator.email]" />
                    </v-col>

                    <v-col cols="12">
                        <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password"
                            :error-messages="form.errors?.password"
                            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            @click:append-inner="showPassword = !showPassword" label="Senha" />
                    </v-col>

                    <v-col cols="12" class="d-flex align-center justify-space-between">
                        <v-btn :to="{ name: 'auth.register' }" prepend-icon="mdi-account" text="Criar conta" color="primary"
                            size="large" variant="plain" />
                        <v-btn type="submit" append-icon="mdi-arrow-right" text="Acessar" color="primary"
                            size="large" :loading="form.submitting" />
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import validator from '@/utils/validator';
import { req } from '@/plugins/axios';

const showPassword = ref(false);
const form = ref({
    valid: false,
    submitting: false,
    data: {
        email: null,
        password: null
    },
    errors: {}
});

/**
 * Created
 */
useAppStore().updateTitleBar('Login');

/**
 * Methods
 */
const method_login = () => {
    if (!form.value.valid) {
        return;
    }

    form.value.submitting = true;
    req({
        action: '/auth/login',
        method: 'post',
        data: {
            email: form.value.data.email,
            password: form.value.data.password
        },
        success: (resp) => {
            let access = resp.data.access;
            let user = resp.data.user;
            console.log('Sucesso', access, user);
        },
        fail: (resp) => {
            form.value.errors = resp.response.data.errors;
        },
        finally: () => {
            form.value.submitting = false;
        }
    });
}

</script>
