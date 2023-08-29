<template>
    <v-row justify="center">
        <v-col cols="12" class="text-center">
            <h1>Login</h1>
        </v-col>

        <v-col cols="12" sm="8" md="6" lg="4">
            <v-form>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="E-mail" v-model="form.data.email" />
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

const showPassword = ref(false);
const form = ref({
    data: {
        email: null,
        password: null
    }
});

/**
 * Created
 */
useAppStore().updateTitleBar('Login');


</script>
