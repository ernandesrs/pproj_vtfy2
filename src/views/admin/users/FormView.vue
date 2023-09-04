<template>
    <base-view :page-title="computed_isCreating ? 'Novo usuário' : 'Editar usuário'" :page-breadcrumbs="[
        {
            text: 'Usuários',
            to: { name: 'admin.users' },
            disabled: false
        },
        {
            text: computed_isCreating ? 'Novo' : 'Editar',
            to: computed_isCreating ? { name: 'admin.users.create' } : { name: 'admin.users.edit', params: { user_id: route.params.user_id } },
            disabled: true
        }
    ]" :requests="computed_isCreating ? [] : [
    method_getUser,
    method_getRoles
]" :create-action="{
    text: 'Novo usuário',
    to: { name: 'admin.users.create' },
    show: authStore.permission('user').canCreate() && route.name == 'admin.users.edit'
}">

        <template #content>
            <v-row justify="center">
                <v-col cols="12" md="7" lg="8" order="last" order-md="first">
                    <content-elem title="Dados da conta">
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
                                            ]" label="Usuário" />
                                    </v-col>
                                    <!-- /username -->

                                    <!-- gender -->
                                    <v-col cols="12" sm="6">
                                        <v-select v-model="form.data.gender" :error-messages="form.errors?.gender" :rules="[
                                            validator.required,
                                            validator.gender
                                        ]" label="Gênero"
                                            :items="Object.entries(ALLOWED_GENDERS).map((ag) => { return { title: ag[1].text, value: ag[1].value }; })" />
                                    </v-col>
                                    <!-- /gender -->

                                    <!-- email -->
                                    <v-col cols="12">
                                        <v-text-field v-model="form.data.email" :error-messages="form.errors?.email"
                                            label="E-mail" :readonly="!computed_isCreating" :rules="computed_isCreating ? [
                                                validator.required,
                                                validator.email
                                            ] : []" />
                                    </v-col>
                                    <!-- /email -->

                                    <!-- password -->
                                    <v-col cols="12" sm="6">
                                        <v-text-field type="password" v-model="form.data.password"
                                            :error-messages="form.errors?.password" label="Senha" :rules="computed_isCreating ? [
                                                validator.required,
                                                validator.password
                                            ] : []" />
                                    </v-col>
                                    <!-- /password -->

                                    <!-- password_confirmation -->
                                    <v-col cols="12" sm="6">
                                        <v-text-field type="password" v-model="form.data.password_confirmation"
                                            :error-messages="form.errors?.password_confirmation" label="Confirmar senha"
                                            :rules="computed_isCreating ? [
                                                validator.required,
                                                validator.password
                                            ] : []" />
                                    </v-col>
                                    <!-- /password_confirmation -->

                                    <!-- submit -->
                                    <v-col cols="12">
                                        <div class="text-center">
                                            <v-btn type="submit"
                                                :text="(computed_isCreating ? 'Registrar' : 'Atualizar') + ' conta'"
                                                color="primary" prepend-icon="mdi-check" :loading="form.submiting" />
                                        </div>
                                    </v-col>
                                    <!-- /submit -->
                                </v-row>
                            </v-form>
                        </template>
                    </content-elem>
                </v-col>

                <v-col v-if="!computed_isCreating" cols="12" md="5" lg="4" order="first" order-md="last">
                    <content-elem title="Foto" class="mb-6">
                        <template #content>
                            <div class="d-flex justify-center mb-5">
                                <user-avatar :username="form.data?.first_name" :photo_url="form.data?.photo_url" />
                            </div>
                            <div class="d-flex justify-center">
                                <button-confirmation v-if="form.data?.photo_url" text="Excluir foto"
                                    icon="mdi-trash-can-outline" color="danger" variant="outlined"
                                    dialog-title="Excluir a foto?"
                                    dialog-text="Ao confirmar a exclusão da foto ela não poderá ser recuperada."
                                    :confirm-callback="method_photoDelete" />
                            </div>
                        </template>
                    </content-elem>

                    <content-elem v-if="authStore.isSuperuser && authStore.getUser.id != form.data.id"
                        title="Nível e funções" class="mb-6">
                        <template #content>
                            <confirmation-dialog v-model="formLevel.showConfirmationDialog"
                                :confirm-callback="method_updateLevelConfirmed"
                                :cancel-callback="method_updateLevelCanceled" color="warning" title="Atenção!"
                                text="Você está promovendo este usuário a super usuário, isso o concede poder total sobre o sistema, incluindo e não limitando-se a editar e excluir outros super usuários." />

                            <v-form v-model="formLevel.valid">
                                <v-select label="Nível de acesso" v-model="formLevel.data.level" :items="Object.entries(ALLOWED_LEVELS).map((l) => {
                                    return {
                                        title: l[1].text,
                                        value: l[1].value
                                    }
                                })" :rules="[]" :error-messages="formLevel.errors?.level"
                                    :loading="formLevel.submiting" :disabled="formLevel.submiting" />
                            </v-form>

                            <v-form v-if="form.data.level === 8">
                                <v-select label="Funções" v-model="formRoles.data.roles" :items="Object.entries(roles.list).map((r) => {
                                    return {
                                        title: r[1].display_name,
                                        value: r[1].id
                                    };
                                })" multiple :loading="formRoles.submiting" :disabled="formRoles.submiting" />
                            </v-form>
                        </template>
                    </content-elem>

                    <content-elem title="Detalhes da conta">
                        <template #content>
                            <detail-group tooltip="Data de criação da conta" icon="mdi-calendar-outline" title="Registrado"
                                :text="(new
                                    Date(form.data.created_at)).toLocaleString('br')" />

                            <detail-group tooltip="Data de verificação da conta" icon="mdi-calendar-check-outline"
                                title="Verificação" :text="form.data.email_verified_at ? (new
                                    Date(form.data.created_at)).toLocaleString('br') : 'Não verificado'" />

                            <detail-group tooltip="Nível de acesso do usuário" icon="mdi-license" title="Nível de acesso"
                                :text="form.data?.level === undefined ? 'Não definido' : ALLOWED_LEVELS[form.data?.level].text" />
                        </template>
                    </content-elem>
                </v-col>
            </v-row>
        </template>

    </base-view>
</template>

<script setup>

import ButtonConfirmation from '@/components/ButtonConfirmation.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import ContentElem from '@/components/ContentElem.vue';
import DetailGroup from '@/components/DetailGroup.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import BaseView from '@/layouts/admin/BaseView';
import { req } from '@/plugins/axios';
import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/user/auth';
import validator from '@/utils/validator';
import { watch, ref, computed, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * 
 * Vars, Refs ands Reactives
 * 
 */
const ALLOWED_GENDERS = {
    n: {
        value: 'n',
        text: 'Não definir'
    },
    m: {
        value: 'm',
        text: 'Masculino'
    },
    f: {
        value: 'f',
        text: 'Feminino'
    }
};

const ALLOWED_LEVELS = {
    0: {
        text: 'Comum',
        value: 0
    },
    8: {
        text: 'Administrativo',
        value: 8
    },
    9: {
        text: 'Super usuário',
        value: 9
    }
};

const appStore = useAppStore();

const authStore = useAuthStore();

const route = useRoute();

const router = useRouter();

const form = ref({
    valid: false,
    submiting: false,
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

const userOldLevel = ref(null);
const formLevel = ref({
    showConfirmationDialog: false,
    valid: false,
    submiting: false,
    data: {
        level: null
    },
    errors: {}
});

const formRoles = ref({
    valid: false,
    submiting: false,
    data: {
        roles: null
    },
    errors: {}
});

const roles = ref({
    list: []
});

/**
 *
 * Computeds
 *  
 */

const computed_isCreating = computed(() => {
    return route.params?.user_id ? false : true;
});

/**
 * 
 * Methods
 */

const method_getUser = () => {
    let id = route.params?.user_id;

    return req({
        action: '/admin/users/' + id,
        method: 'get',
        success: (resp) => {
            const user = resp.data.user;

            form.value.data = user;
            formLevel.value.data.level = user.level;

            formRoles.value.data.roles = user.roles.map((r) => {
                return r.id;
            });
        }
    });
};

const method_getRoles = () => {
    return req({
        action: '/admin/roles',
        method: 'get',
        success: (resp) => {
            roles.value.list = resp.data.roles.list;
        }
    });
}

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
        action: computed_isCreating.value ? '/admin/users' : '/admin/users/' + data.id,
        method: computed_isCreating.value ? 'post' : 'put',
        data: data,
        success: (resp) => {
            if (computed_isCreating.value) {
                appStore.addAlert().success('Novo usuário foi registrado com sucesso!', 'Registrado!', true);
                router.push({ name: 'admin.users.edit', params: { user_id: resp.data.user.id } });
            } else {
                appStore.addAlert().info('Os dados do usuário foram atualizados com sucesso!', 'Atualizado!');
            }
        },
        fail: (resp) => {
            form.value.errors = resp.response.data.errors;
        },
        finally: () => {
            form.value.submiting = false;
        }
    });
};

const method_photoDelete = () => {
    return req({
        action: '/admin/users/' + form.value.data?.id + '/photo-delete',
        method: 'delete',
        success: () => {
            appStore.addAlert().info('A foto do usuário foi excluída com sucesso.', 'Excluída!');
            form.value.data.photo_url = null;
        }
    });
};

const method_updateLevel = () => {
    if (!form.value.data?.id) {
        return;
    }

    formLevel.value.submiting = true;
    return req({
        action: '/admin/users/' + form.value.data.id + '/update-level',
        method: 'put',
        data: {
            level: formLevel.value.data.level
        },
        success: () => {
            form.value.data.level = formLevel.value.data.level;
            appStore.addAlert().info('O nível de acesso do usuário foi atualizado com sucesso!', 'Nível atualizado!');
        },
        fail: (resp) => {
            form.value.errors = resp.response.data.errors;
        },
        finally: () => {
            formLevel.value.submiting = false;
            formLevel.value.valid = false;
        }
    });
};

const method_updateLevelConfirmed = () => {
    method_updateLevel();
};

const method_updateLevelCanceled = () => {
    formLevel.value.data.level = userOldLevel.value;
    userOldLevel.value = null;
}

const method_updateLevelConfirm = (newLevel, oldLevel) => {
    if (newLevel === 9) {
        userOldLevel.value = oldLevel;
        formLevel.value.showConfirmationDialog = true;
    } else {
        method_updateLevel();
    }
}

const method_updateRoles = (newRoles, oldRoles) => {
    if (!form.value.data?.id) {
        return;
    }

    const remove = oldRoles.filter((v) => newRoles.indexOf(v) === -1);
    const add = newRoles.filter((v) => oldRoles.indexOf(v) === -1);
    let action = null;
    let method = null;

    if (remove.length) {
        action = '/admin/users/roles/' + form.value.data.id + '/' + remove[0];
        method = 'delete';
    } else if (add.length) {
        action = '/admin/users/roles/' + form.value.data.id + '/' + add[0];
        method = 'put';
    }

    formRoles.value.submiting = true;
    return req({
        action: action,
        method: method,
        success: () => {
            appStore.addAlert().info('A função deste usuário foi atualizada com sucesso!', 'Função atualizada!');
        },
        fail: (resp) => {
            formRoles.value.errors = resp.response.data.errors;
        },
        finally: () => {
            formRoles.value.submiting = false;
        }
    });
}

const method_formReset = () => {
    form.value.valid = false;
    form.value.data = {
        first_name: null,
        last_name: null,
        username: null,
        gender: null,
        email: null,
        password: null,
        password_confirmation: null
    };

    formLevel.value.valid = false;
    formLevel.value.data = {
        level: form.value.data.level ?? null
    };

    formRoles.value.valid = false;
    formRoles.value.data = {
        roles: []
    };
}

/**
 * 
 * Watchers
 * 
 */
watch(() => formLevel.value.data.level, (nv, ov) => {
    if (ov === null) {
        return;
    }

    if (nv !== ov && nv !== form.value.data.level) {
        method_updateLevelConfirm(nv, ov);
    }
}, { deep: true });

watch(() => formRoles.value.data.roles, (nv, ov) => {
    if (ov === null) {
        return;
    }

    method_updateRoles(nv, ov);
});

/**
 * 
 * On updated
 * 
 */

onUpdated(() => {
    method_formReset();
});

</script>
