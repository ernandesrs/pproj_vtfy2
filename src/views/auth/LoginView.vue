<template>
    <base-view page-title="Acessar conta">

        <template #image>
            <v-img src="./../../assets/login.svg" width="100%" />
        </template>

        <template #form>
            <div class="d-flex justify-space-between mb-8">
                <v-btn :disabled="!googleLogin" :href="googleLogin" prepend-icon="mdi-google" text="Login com Google" color="#E94235"
                    variant="outlined" />
                <v-btn :disabled="!facebookLogin" :href="facebookLogin" prepend-icon="mdi-facebook" text="Login com Facebook" color="#0572E6" variant="outlined" />
            </div>
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
                        <v-btn :to="{ name: 'auth.register' }" prepend-icon="mdi-account" text="Criar conta" color="primary"
                            size="large" variant="plain" />
                        <v-btn type="submit" append-icon="mdi-arrow-right" text="Acessar" color="primary" size="large"
                            :loading="form.submitting" />
                    </v-col>
                </v-row>
            </v-form>
            <div class="border mt-8 mb-3 border" />
            <div class="text-center">
                <v-btn :to="{ name: 'auth.forget' }" text="Esquecia a senha" color="primary" variant="plain" size="large"
                    :ripple="false" />
            </div>
        </template>
    </base-view>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/user/auth';
import { ref, onUpdated } from 'vue';
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

const authStore = useAuthStore();

const router = useRouter();

const route = useRoute();

const showPassword = ref(false);

const googleLogin = ref(null);

const facebookLogin = ref(null);

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
        appStore.addAlert().error(r.response.data.error, r.response.data.error);
        form.value.errors = r.response?.data?.errors;
    }).then(() => {
        form.value.submitting = false;
    })
};

const method_socialLogin = () => {
    if (route.name === 'auth.socialLogin') {

        let error = route.query?.error;
        if (error) {
            appStore.addAlert().error(error, 'Falha no login', true);
            router.push({ name: 'auth.login' });
        } else {
            let fullToken = route.query?.full;
            let expire_in_minutes = route.query?.expire_in_minutes;

            authStore.socialLogin(fullToken, expire_in_minutes);
        }

    }
};

const method_getSocialLoginUris = () => {
    return req({
        action: '/auth/login/social-uris',
        method: 'get',
        success: (resp) => {
            googleLogin.value = resp.data.socials.google;
            facebookLogin.value = resp.data.socials.facebook;
        }
    });
};

/**
 * 
 * Watchers
 * 
 */

onUpdated(() => {
    method_getSocialLoginUris();
});

/**
 * Created
 */

method_socialLogin();
method_getSocialLoginUris();

</script>
