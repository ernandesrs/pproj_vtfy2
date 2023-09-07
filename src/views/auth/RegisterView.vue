<template>
    <base-view page-title="Criar uma conta">

        <template #image>
            <v-img src="./../../assets/register.svg" width="100%" />
        </template>

        <template #form>
            <v-form v-model="form.valid" @submit.prevent="method_register">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Nome" v-model="form.data.first_name"
                            :rules="[validator.required, validator.first_name]" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field label="Sobrenome" v-model="form.data.last_name"
                            :rules="[validator.required, validator.last_name]" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field label="Usuário" v-model="form.data.username"
                            :rules="[validator.required, validator.first_name]" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select label="Gênero"
                            :items="userConfig.genders().map((g) => { return { title: userConfig.genderLabel(g), value: g } })"
                            v-model="form.data.gender" :rules="[validator.required, validator.gender]" />
                    </v-col>

                    <v-col cols="12">
                        <v-text-field label="E-mail" v-model="form.data.email"
                            :rules="[validator.required, validator.email]" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password"
                            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            @click:append-inner="showPassword = !showPassword"
                            :rules="[validator.required, validator.password]" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password_confirmation"
                            :rules="[validator.required, validator.password]" />
                    </v-col>

                    <v-col cols="12" class="d-flex align-center justify-space-between">
                        <v-btn :to="{ name: 'auth.login' }" append-icon="mdi-login" text="Eu tenho conta" color="primary"
                            size="large" variant="plain" />
                        <v-btn type="submit" append-icon="mdi-check" text="Cadastrar" color="primary" size="large"
                            :loading="form.submitting" />
                    </v-col>
                </v-row>
            </v-form>
        </template>
    </base-view>
</template>

<script setup>

import BaseView from '@/layouts/auth/BaseView.vue';
import { req } from '@/plugins/axios';
import { useAppStore } from '@/store/app';
import { userConfig } from '@/utils/config-functions';
import validator from '@/utils/validator';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

const router = useRouter();

const showPassword = ref(false);

const form = ref({
    valid: false,
    submitting: false,
    data: {
        first_name: null,
        last_name: null,
        username: null,
        gender: null,
        email: null,
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
const method_register = () => {
    if (!form.value.valid) {
        appStore.addAlert().missingData();
        return;
    }

    form.value.submitting = true;
    req({
        action: '/auth/register',
        method: 'post',
        data: {
            first_name: form.value.data.first_name,
            last_name: form.value.data.last_name,
            username: form.value.data.username,
            gender: form.value.data.gender,
            email: form.value.data.email,
            password: form.value.data.password,
            password_confirmation: form.value.data.password_confirmation
        },
        success: () => {
            appStore.addAlert().success('Pronto! Sua conta foi registrada, agora faça login.', 'Registrado(a)!', true);
            router.push({ name: 'auth.login' });
        },
        fail: (resp) => {
            form.value.errors = resp.response.data.errors;
        },
        finally: () => {
            form.value.submitting = false;
        }
    });
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
