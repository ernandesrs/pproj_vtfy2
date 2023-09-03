<template>
    <base-view page-title="Usuários" :page-breadcrumbs="[
        {
            text: 'Usuários',
            to: { name: 'admin.users' },
            disabled: true
        }
    ]" :requests="[
    method_getUsers
]" :page-create-action="{
    text: 'Novo usuário',
    to: { name: 'admin.users.create' }
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
                            <tr v-for="item in data.users" :key="item">
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
                                    <v-btn-group>
                                        <v-btn icon="mdi-eye-outline" color="info" variant="outlined" />
                                        <v-btn icon="mdi-pencil-box-outline" color="primary"
                                            :to="{ name: 'admin.users.edit', params: { user_id: item.id } }" />
                                        <button-confirmation icon="mdi-trash-can-outline" color="danger" outlined
                                            :dialog-title="'Excluir ' + item.first_name + ' ' + item.last_name + '?'"
                                            dialog-text="Ao confirmar a exclusão, os dados do usuário não poderão ser recuperados." />
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

/**
 * 
 * Vars, refs, reactives
 * 
 */
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

</script>
