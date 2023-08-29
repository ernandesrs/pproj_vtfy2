<template>
    <v-row justify="center">
        <v-col cols="12">
            <h1>Login</h1>
        </v-col>

        <v-col cols="12">
            <v-form v-model="form.valid">
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="E-mail" v-model="form.data.email" :rules="[validator.required, validator.email]" />
                    </v-col>

                    <v-col cols="12">
                        <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password"
                            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            @click:append-inner="showPassword = !showPassword" label="Senha" />
                    </v-col>

                    <v-col cols="12" class="d-flex align-center justify-space-between">
                        <v-btn :to="{ name: 'auth.register' }" prepend-icon="mdi-account" text="Criar conta" color="primary"
                            size="large" variant="plain" />
                        <v-btn append-icon="mdi-arrow-right" text="Acessar" color="primary" size="large" />
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

const showPassword = ref(false);
const form = ref({
    valid: false,
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


</script>
