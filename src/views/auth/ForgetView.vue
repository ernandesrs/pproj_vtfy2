<template>
    <base-view page-title="Esqueci a senha">

        <template #image>
            <v-img src="./../../assets/forget-password.svg" width="100%" />
        </template>

        <template #form>
            <template v-if="sended">

                <v-alert type="success" title="Link enviado!"
                    text="Uma mensagem com um link de atualização foi enviado para o e-mail informado."
                    variant="outlined" />

            </template>
            <template v-else-if="hasSended">
                <v-alert type="info" title="Link já foi enviado!"
                    text="Um link de recuperação já foi enviado para o e-mail fornecido." variant="outlined" />
            </template>
            <template v-else>
                <v-form v-model="form.valid" @submit.prevent="method_submit">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="E-mail" v-model="form.data.email" :error-messages="form.errors?.email"
                                :rules="[validator.required, validator.email]" />
                        </v-col>

                        <v-col cols="12" class="d-flex align-center justify-center">
                            <v-btn type="submit" append-icon="mdi-arrow-right" text="Recuperar senha" color="primary"
                                size="large" :loading="form.submitting" />
                        </v-col>
                    </v-row>
                </v-form>
                <div class="border mt-8 mb-3 border" />
                <div class="text-center">
                    <v-btn :to="{ name: 'auth.login' }" text="Lembrei a senha" color="primary" variant="plain" size="large"
                        :ripple="false" />
                </div>
            </template>
        </template>
    </base-view>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import validator from '@/utils/validator';
import BaseView from '@/layouts/auth/BaseView.vue';
import { req } from '@/plugins/axios';

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

const sended = ref(false);

const hasSended = ref(false);

const form = ref({
    valid: false,
    submitting: false,
    data: {
        email: null
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
const method_submit = () => {
    if (!form.value.valid) {
        appStore.addAlert().missingData();
        return;
    }

    form.value.submitting = true;

    return req({
        action: '/auth/forget-password',
        method: 'post',
        data: {
            email: form.value.data.email
        },
        success: () => {
            sended.value = true;
            form.value.data.email = null;
        },
        fail: (resp) => {
            form.value.errors = resp.response?.data?.errors;
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
