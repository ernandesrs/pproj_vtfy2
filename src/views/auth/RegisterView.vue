<template>
    <v-row justify="center">
        <v-col cols="12">
            <h1>Cadastrar conta</h1>
        </v-col>

        <v-col>
            <v-form>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Nome" v-model="form.data.first_name" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field label="Sobrenome" v-model="form.data.last_name" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field label="Usuário" v-model="form.data.username" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select label="Gênero" :items="[
                            {
                                text: 'Masculino',
                                value: 'm'
                            },
                            {
                                text: 'Feminino',
                                value: 'f'
                            },
                            {
                                text: 'Não definir',
                                value: 'n'
                            }
                        ]" item-title="text" item-value="value" v-model="form.data.gender" />
                    </v-col>

                    <v-col cols="12">
                        <v-text-field label="E-mail" v-model="form.data.email" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.data.password"
                            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                            @click:append-inner="showPassword = !showPassword" />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field :type="showPassword ? 'text' : 'password'"
                            v-model="form.data.password_confirmation" />
                    </v-col>

                    <v-col cols="12" class="d-flex align-center justify-space-between">
                        <v-btn :to="{ name: 'auth.login' }" append-icon="mdi-login" text="Eu tenho conta" color="primary"
                            size="large" variant="plain" />
                        <v-btn append-icon="mdi-check" text="Cadastrar" color="primary" size="large" />
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
        first_name: null,
        last_name: null,
        username: null,
        gender: null,
        email: null,
        password: null,
        password_confirmation: null
    }
});

/**
 * Created
 */
useAppStore().updateTitleBar('Cadastro');

</script>
