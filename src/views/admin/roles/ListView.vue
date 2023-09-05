<template>
    <base-view page-title="Funções" :page-breadcrumbs="[
        {
            text: 'Funções',
            to: {
                name: 'admin.roles',
            },
            disabled: true
        }
    ]" :requests="[method_getRoles]">
        <template #content>

            <table-list :items="data.roles" :pages="data.pages" :theads="[
                {
                    label: 'Nome da função'
                }
            ]" v-slot="{ item, index }">
                <table-list-item :data-id="item.id" :data-index="index" :columns="[
                    {
                        value: item.display_name
                    }
                ]"
                    :edit-action="{ show: authStore.permission('role').canUpdate(), to: { name: 'admin.roles.edit', params: { user_id: item.id } } }"
                    :delete-confirm-action="{
                        show: authStore.permission('role').canDelete(),
                        callback: (e) => {
                            console.log(e);
                        },
                        dialogTitle: 'Excluir a função ' + item.display_name + '?',
                        dialogText: 'Ao confirmar, a exclusão não poderá ser desfeita!'
                    }" />
            </table-list>

        </template>
    </base-view>
</template>

<script setup>

import TableList from '@/components/list/TableList.vue';
import TableListItem from '@/components/list/TableListItem.vue';
import BaseView from '@/layouts/admin/BaseView';
import { req } from '@/plugins/axios';
import { useAuthStore } from '@/store/user/auth';
import { ref } from 'vue';

/**
 * 
 * Consts, vars, refs
 */
const authStore = useAuthStore();

const data = ref({
    roles: [],
    pages: [],
});

/**
 * 
 * Methods
 * 
 */

const method_getRoles = (page = 1) => {
    return req({
        action: '/admin/roles?page=' + page,
        method: 'get',
        success: (resp) => {
            data.value.roles = resp.data.roles.list;
            data.value.pages = resp.data.roles.meta.links;
        }
    });
}

</script>
