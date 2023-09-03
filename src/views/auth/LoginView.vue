<template>
    <base-view :page-breadcrumbs="[
        {
            text: 'Acessar conta'
        }
    ]">
        <v-row justify="center">
            <v-col cols="12">
                <h1>Login</h1>
            </v-col>

            <v-col cols="12">
                <v-form v-model="form.valid" @submit.prevent="method_login">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="E-mail" v-model="form.data.email" :error-messages="form.errors?.email"
                                :rules="[validator.required, validator.email]" />
                        </v-col>

                        <v-col cols="12">
                            <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password"
                                :error-messages="form.errors?.password" :rules="[validator.required, validator.password]"
                                :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                @click:append-inner="showPassword = !showPassword" label="Senha" />
                        </v-col>

                        <v-col cols="12" class="d-flex align-center justify-space-between">
                            <v-btn :to="{ name: 'auth.register' }" prepend-icon="mdi-account" text="Criar conta"
                                color="primary" size="large" variant="plain" />
                            <v-btn type="submit" append-icon="mdi-arrow-right" text="Acessar" color="primary" size="large"
                                :loading="form.submitting" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </base-view>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/user/auth';
import { ref } from 'vue';
import validator from '@/utils/validator';
import BaseView from '@/layouts/auth/BaseView.vue';

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

const authStore = useAuthStore();

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
 * 
 * Computeds
 * 

/**
 * Methods
 */
const method_login = () => {
    if (!form.value.valid) {
        appStore.addAlert().missingData();
        return;
    }

    form.value.submitting = true;

    authStore.login(form.value.data.email, form.value.data.password).catch((r) => {
        console.log(r);
        form.value.errors = r.response?.data?.errors;
    }).then(() => {
        form.value.submitting = false;
    })
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
