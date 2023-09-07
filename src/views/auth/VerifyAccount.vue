<template>
    <base-view page-title="Verificação de conta">

        <template #image>
            <v-img src="./../../assets/verify-account.svg" width="100%" />
        </template>

        <template #form>
            <template v-if="fail">

                <v-alert variant="outlined" color="danger" title="Token inválido ou não encontrado!"
                    text="Solicite um novo link de verificação ou acesse diretamente por seu e-mail." />

            </template>
            <div v-else class="d-flex align-center justify-center justify-md-start">
                <v-progress-circular indeterminate :size="40" :width="5" color="success" />
                <p class="ml-5 text-h7 text-md-h6 text-grey-darken-1">Verificando sua conta, aguarde</p>
            </div>
        </template>
    </base-view>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import BaseView from '@/layouts/auth/BaseView.vue';
import { req } from '@/plugins/axios';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

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

const fail = ref(false);

/**
 * 
 * Computeds
 * 

/**
 * Methods
 */
const method_verify = () => {
    const token = route.query?.token;
    if (!token) {
        fail.value = true;
        return;
    }

    return req({
        action: '/auth/verify-account?token=' + token,
        method: 'get',
        success: () => {
            appStore.addAlert().success('Sua conta foi verificada com sucesso!', 'Verificada!', true);
            router.push({ name: 'auth.login' });
        },
        fail: () => {
            fail.value = true;
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
method_verify();

</script>
