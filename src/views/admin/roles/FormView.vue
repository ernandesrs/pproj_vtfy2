<template>
    <base-view
        :page-title="computed_isCreating ? 'Nova função' : computed_showMode ? 'Detalhes da função' : 'Editar função'"
        :page-breadcrumbs="[
            {
                text: 'Funções',
                to: { name: 'admin.roles' },
                disabled: false
            },
            {
                text: computed_isCreating ? 'Nova' : computed_showMode ? 'Detalhes' : 'Editar',
                to: computed_isCreating ? { name: 'admin.roles.create' } : { name: computed_showMode ? 'admin.roles.show' : 'admin.roles.edit', params: { role_id: route.params.role_id } },
                disabled: true
            }
        ]" :requests="computed_isCreating ? [] : [
    method_getRole
]" :create-action="{
    text: 'Nova função',
    to: { name: 'admin.roles.create' },
    show: !computed_isCreating && authStore.permission('role').canCreate()
}">
        <template #content>

            <content-elem>
                <template #content>

                    <v-row justify="center">
                        <v-col cols="12" sm="10" md="8" lg="6">
                            <v-form v-model="form.valid" fast-fail @submit.prevent="method_submit">
                                <v-row justify="center" class="py-3">
                                    <v-col cols="12">
                                        <v-text-field label="Nome da função" v-model="form.data.display_name" :rules="[
                                            validator.required
                                        ]" :error-messages="form.errors?.display_name" :readonly="computed_showMode" />
                                    </v-col>

                                    <v-col v-if="!computed_isCreating">

                                        <v-expansion-panels variant="default">
                                            <v-expansion-panel
                                                v-for="permissibleActions, permissibleIndex in form.data.permissibles"
                                                :key="permissibleIndex" :label="permissibleIndex">
                                                <v-expansion-panel-title>
                                                    {{ (computed_showMode ? 'Ver ações permitidas/negadas sobre ' :
                                                        'Permitir/negar ações sobre ') +
                                                        permissibleIndex
                                                    }}
                                                </v-expansion-panel-title>
                                                <v-expansion-panel-text>
                                                    <div class="d-flex flex-wrap justify-center">
                                                        <v-switch v-for="action, actionIndex in permissibleActions"
                                                            :key="actionIndex"
                                                            v-model="form.data.permissibles[permissibleIndex][actionIndex]"
                                                            :label="actionIndex" class="mx-1"
                                                            :disabled="computed_showMode" />
                                                    </div>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                        </v-expansion-panels>

                                    </v-col>

                                    <v-col v-if="!computed_showMode" cols="12" class="text-center">
                                        <v-btn type="submit"
                                            :text="(computed_isCreating ? 'Cadastrar' : 'Atualizar') + ' função'"
                                            color="primary" :loading="form.submitting" />
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-row>

                </template>
            </content-elem>

        </template>
    </base-view>
</template>

<script setup>

import ContentElem from '@/components/ContentElem.vue';
import BaseView from '@/layouts/admin/BaseView';
import { req } from '@/plugins/axios';
import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/user/auth';
import validator from '@/utils/validator';
import { onUpdated, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();

const appStore = useAppStore();

const route = useRoute();

const router = useRouter();

const form = ref({
    submitting: false,
    valid: false,
    data: {
    },
    errors: {}
});

const computed_isCreating = computed(() => {
    return route.params?.role_id ? false : true;
});

const computed_showMode = computed(() => {
    return ['admin.roles.show'].includes(route.name);
});

const method_getRole = () => {
    let id = route.params?.role_id;

    return req({
        action: '/admin/roles/' + id,
        method: 'get',
        success: (resp) => {
            const role = resp.data.role;

            form.value.data = role;
        }
    });
};

const method_submit = () => {
    if (!form.value.valid) {
        appStore.addAlert().missingData();
        return;
    }

    let data = form.value.data;

    form.value.submitting = true;
    return req({
        action: '/admin/roles' + (computed_isCreating.value ? '' : '/' + data.id),
        method: computed_isCreating.value ? 'post' : 'put',
        data: {
            display_name: data.display_name,
            permissibles: data.permissibles
        },
        success: (resp) => {
            if (computed_isCreating.value) {
                appStore.addAlert().success('Uma nova função foi cadastrada com sucesso!', 'Cadastrada!', true);
                router.push({ name: 'admin.roles.edit', params: { role_id: resp.data.role.id } });
            } else {
                appStore.addAlert().info('Função atualizada com sucesso!', 'Atualizada!', false);
            }
        },
        fail: (resp) => {
            form.value.errors = resp.response.data.errors;
        },
        finally: () => {
            form.value.submitting = false;
        }
    });
};

const method_formReset = () => {
    form.value.submitting = false;
    form.value.valid = false;
    form.value.errors = {};
    form.value.data = {
        display_name: null
    };
};

/**
 * 
 * On updated
 * 
 */

onUpdated(() => {

    method_formReset();

});

</script>
