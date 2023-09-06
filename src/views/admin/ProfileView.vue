<template>
    <base-view page-title="Meu perfil" :page-breadcrumbs="[
        {
            text: 'Perfil',
            to: { name: 'admin.home' },
            disabled: true
        }
    ]" :requests="[]">

        <template #content>
            <v-row>
                <v-col cols="12" md="7" lg="8" order="last" order-md="first">
                    <content-elem title="Seus dados">
                        <template #content>
                            <v-form v-model="form.valid" @submit.prevent="method_submit">
                                <v-row class="pt-3">
                                    <!-- first_name -->
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="form.data.first_name"
                                            :error-messages="form.errors?.first_name" :rules="[
                                                validator.required,
                                                validator.first_name
                                            ]" label="Nome" />
                                    </v-col>
                                    <!-- /first_name -->

                                    <!-- last_name -->
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="form.data.last_name" :error-messages="form.errors?.last_name"
                                            :rules="[
                                                validator.required,
                                                validator.last_name
                                            ]" label="Sobrenome" />
                                    </v-col>
                                    <!-- /last_name -->

                                    <!-- username -->
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="form.data.username" :error-messages="form.errors?.username"
                                            :rules="[
                                                validator.required,
                                                validator.first_name
                                            ]" label="Sobrenome" />
                                    </v-col>
                                    <!-- /username -->

                                    <!-- gender -->
                                    <v-col cols="12" sm="6">
                                        <v-select v-model="form.data.gender" :error-messages="form.errors?.gender" :rules="[
                                            validator.required,
                                            validator.gender
                                        ]" label="Gênero"
                                            :items="userConfig.genders().map((g) => { return { title: userConfig.genderLabel(g), value: g }; })" />
                                    </v-col>
                                    <!-- /gender -->

                                    <!-- email -->
                                    <v-col cols="12">
                                        <v-text-field v-model="form.data.email" :error-messages="form.errors?.email"
                                            label="E-mail" readonly />
                                    </v-col>
                                    <!-- /email -->

                                    <!-- password -->
                                    <v-col cols="12" sm="6">
                                        <v-text-field type="password" v-model="form.data.password"
                                            :error-messages="form.errors?.password" label="Senha" />
                                    </v-col>
                                    <!-- /password -->

                                    <!-- password_confirmation -->
                                    <v-col cols="12" sm="6">
                                        <v-text-field type="password" v-model="form.data.password_confirmation"
                                            :error-messages="form.errors?.password_confirmation" label="Confirmar senha" />
                                    </v-col>
                                    <!-- /password_confirmation -->

                                    <!-- submit -->
                                    <v-col cols="12">
                                        <div class="text-center">
                                            <v-btn type="submit" text="Atualizar conta" color="primary"
                                                prepend-icon="mdi-check" :loading="form.submiting" />
                                        </div>
                                    </v-col>
                                    <!-- /submit -->
                                </v-row>
                            </v-form>
                        </template>
                    </content-elem>
                </v-col>

                <v-col cols="12" md="5" lg="4" order="first" order-md="last">
                    <content-elem title="Sua foto" class="mb-6">
                        <template #content>
                            <div class="d-flex justify-center mb-5">
                                <user-avatar :username="authStore.getFirstName" :photo_url="authStore?.getPhotoUrl" />
                            </div>
                            <div class="d-flex justify-center">
                                <button-confirmation v-if="authStore.getPhotoUrl" text="Excluir foto"
                                    icon="mdi-trash-can-outline" color="danger" variant="outlined"
                                    dialog-title="Excluir sua foto?"
                                    dialog-text="Ao confirmar a exclusão da sua foto ela não poderá ser recuperada."
                                    :confirm-callback="method_photoDelete" />
                                <v-form v-else v-model="formPhoto.valid" fast-fail class="w-100">
                                    <v-file-input @change="method_photoUpload" v-model="formPhoto.data.photo"
                                        label="Nova foto" density="compact" accept="image/*" :rules="[validator.images]"
                                        :error-messages="formPhoto.errors?.photo" :loading="formPhoto.submiting" />
                                </v-form>
                                <!--  -->
                            </div>
                        </template>
                    </content-elem>

                    <content-elem title="Detalhes da conta">
                        <template #content>
                            <detail-group tooltip="Data de criação da conta" icon="mdi-calendar-outline" title="Registrado"
                                :text="(new
                                    Date(authStore.getUser.created_at)).toLocaleString('br')" />

                            <detail-group tooltip="Data de verificação da conta" icon="mdi-calendar-check-outline"
                                title="Verificação" :text="authStore.getUser.email_verified_at ? (new
                                    Date(authStore.getUser.created_at)).toLocaleString('br') : 'Não verificado'" />

                            <detail-group tooltip="Nível de acesso do usuário" icon="mdi-license" title="Nível de acesso"
                                :text="userConfig.levelLabel(authStore.getUser.level)" />
                        </template>
                    </content-elem>
                </v-col>
            </v-row>
        </template>

    </base-view>
</template>

<script setup>

import BaseView from '@/layouts/admin/BaseView.vue';
import { useAuthStore } from '@/store/user/auth';
import { useAppStore } from '@/store/app';
import UserAvatar from '@/components/UserAvatar.vue';
import { ref } from 'vue';
import validator from '@/utils/validator';
import { req } from '@/plugins/axios';
import ContentElem from '@/components/ContentElem.vue';
import ButtonConfirmation from '@/components/ButtonConfirmation.vue';
import DetailGroup from '@/components/DetailGroup.vue';
import { userConfig } from '@/utils/config-functions';

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

const authStore = useAuthStore();

const appStore = useAppStore();

const form = ref({
    submiting: false,
    valid: false,
    data: {
        first_name: null,
        last_name: null,
        username: null,
        gender: null,
        email: null,
        password: null,
        password_confirmation: null,
    },
    errors: {}
});

const formPhoto = ref({
    submiting: false,
    valid: false,
    data: {
        photo: null,
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
const method_getUser = () => {
    form.value.data.first_name = authStore.getUser.first_name;
    form.value.data.last_name = authStore.getUser.last_name;
    form.value.data.username = authStore.getUser.username;
    form.value.data.gender = authStore.getUser.gender;
    form.value.data.email = authStore.getUser.email;
};

const method_submit = () => {
    if (!form.value.valid) {
        appStore.addAlert().missingData();
        return;
    }

    let data = form.value.data;
    if (!data.password?.length) {
        delete data.password;
        delete data.password_confirmation;
    }

    form.value.submiting = true;
    req({
        action: '/me/update',
        method: 'put',
        data: data,
        success: (resp) => {
            appStore.addAlert().info(authStore.getFirstName + ', seus dados foram atualizados com sucesso!', 'Atualizado!');
            authStore.addUser(resp.data.user);
        },
        fail: (resp) => {
            form.value.errors = resp.response.data.errors;
        },
        finally: () => {
            form.value.submiting = false;
        }
    });
};

const method_photoUpload = () => {
    if (!formPhoto.value.valid) {
        appStore.addAlert().danger('Erro ao validar sua foto, verifique-a e tente novamente.', 'Erro ao validar!');
        return;
    }

    let data = new FormData();

    data.append('photo', formPhoto.value.data.photo[0]);

    formPhoto.value.submiting = true;
    return req({
        action: '/me/photo-upload',
        method: 'post',
        data: data,
        success: (resp) => {
            formPhoto.value.data.photo = null;
            appStore.addAlert().success('Sua foto foi atualizada com sucesso!', 'Foto atualizada!');
            authStore.addUser(resp.data.user);
        },
        fail: (resp) => {
            form.value.errors = resp.response.data.errors;
        },
        finally: () => {
            formPhoto.value.submiting = false;
        }
    });
}

const method_photoDelete = () => {
    return req({
        action: '/me/photo-delete',
        method: 'delete',
        success: () => {
            appStore.addAlert().info('Sua foto foi excluida definitvamente.', 'Foto excluída!');
            authStore.user.photo_url = null;
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
method_getUser();

</script>
