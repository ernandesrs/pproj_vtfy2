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

                    <table-list :items="data.users" :theads="[
                        {
                            label: 'Usuário'
                        },
                        {
                            label: 'E-mail'
                        },
                        {
                            label: 'Acesso'
                        }
                    ]" v-slot="{ item, index }">

                        <table-list-item :data-id="item.id" :data-index="index" :columns="[
                            {
                                value: item.first_name + ' ' + item.last_name
                            },
                            {
                                value: item.email
                            },
                            {
                                value: { 0: 'Comum', 8: 'Administrador', 9: 'Super usuário' }[item.level]
                            }
                        ]" :show-action="{ to: { name: 'admin.users.edit', params: { user_id: item.id } } }"
                            :edit-action="{ to: { name: 'admin.users.edit', params: { user_id: item.id } } }"
                            :delete-confirm-action="{
                                callback: method_deleteUser,
                                dialogTitle: 'Excluir ' + item.first_name + ' ' + item.last_name + '?',
                                dialogText: 'Ao confirmar, a exclusão deste usuário não poderá mais ser desfeita.'
                            }" />

                    </table-list>

                </template>
            </content-elem>
        </template>
    </base-view>
</template>

<script setup>

import ContentElem from '@/components/ContentElem.vue';
import { req } from '@/plugins/axios';
import BaseView from '@/layouts/admin/BaseView';
import { ref } from 'vue';
import { useAuthStore } from '@/store/user/auth';
import { useAppStore } from '@/store/app';
import TableList from '@/components/list/TableList.vue';
import TableListItem from '@/components/list/TableListItem.vue';

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
