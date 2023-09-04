<template>
    <base-view page-title="Usuários" :page-breadcrumbs="[
        {
            text: 'Usuários',
            to: { name: 'admin.users' },
            disabled: true
        }
    ]" :requests="[
    method_getUsers
]" :create-action="{
    text: 'Novo usuário',
    to: { name: 'admin.users.create' },
    show: authStore.permission('user').canCreate()
}">
        <template #content>
            <content-elem>
                <template #content>

                    <v-table hover>
                        <thead>
                            <tr>
                                <td>Usuário</td>
                                <td>E-mail</td>
                                <td class="d-none d-md-table-cell">Acesso</td>
                                <td class="py-4 text-right">Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in data.users" :key="item">
                                <td>
                                    {{ item.first_name + ' ' + item.last_name }}
                                </td>
                                <td>
                                    {{ item.email }}
                                </td>
                                <td class="d-none d-md-table-cell">
                                    {{ {
                                        0: 'Usuário', 8: 'Administrador', 9: 'Super usuário'
                                    }[item.level] }}
                                </td>
                                <td class="py-4 text-right">
                                    <v-btn-group variant="text">
                                        <v-btn v-if="authStore.permission('user').canView()" icon="mdi-eye-outline"
                                            color="info" size="small" />
                                        <v-btn v-if="authStore.permission('user').canUpdate()" icon="mdi-pencil-box-outline"
                                            color="primary" :to="{ name: 'admin.users.edit', params: { user_id: item.id } }"
                                            size="small" />
                                        <button-confirmation v-if="authStore.permission('user').canDelete()"
                                            icon="mdi-trash-can-outline" color="danger"
                                            :dialog-title="'Excluir ' + item.first_name + ' ' + item.last_name + '?'"
                                            dialog-text="Ao confirmar a exclusão, os dados do usuário não poderão ser recuperados."
                                            size="small" :confirm-callback="method_deleteUser" :data-id="item.id"
                                            :data-index="index" />
                                    </v-btn-group>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>

                </template>
            </content-elem>
        </template>
    </base-view>
</template>

<script setup>

import ButtonConfirmation from '@/components/ButtonConfirmation.vue';
import ContentElem from '@/components/ContentElem.vue';
import { req } from '@/plugins/axios';
import BaseView from '@/layouts/admin/BaseView';
import { ref } from 'vue';
import { useAuthStore } from '@/store/user/auth';
import { useAppStore } from '@/store/app';

/**
 * 
 * Vars, refs, reactives
 * 
 */
const authStore = useAuthStore();

const appStore = useAppStore();

const data = ref({
    users: []
});

/**
 * 
 * Methohds
 * 
 */
const method_getUsers = () => {
    return req({
        action: '/admin/users',
        method: 'get',
        success: (resp) => {
            data.value.users = resp.data.users.list
        }
    });
}

const method_deleteUser = (d) => {
    return req({
        action: '/admin/users/' + d.id,
        method: 'delete',
        success: () => {
            appStore.addAlert().danger('O usuário foi excluído definitivamente.', 'Excluído!');
            data.value.users.splice(d.index, 1);
        }
    });
}

</script>
