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

                    <table-list :items="data.users" :pages="data.pages" :change-page-callback="method_getUsers"
                        :filter-callback="method_filterUsers" v-slot="{ item, index }">

                        <table-list-item :data-id="item.id" :data-index="index"
                            :show-action="{ show: authStore.permission('user').canView(), to: { name: 'admin.users.show', params: { user_id: item.id } } }"
                            :edit-action="{ show: authStore.permission('user').canUpdate(), to: { name: 'admin.users.edit', params: { user_id: item.id } } }"
                            :delete-confirm-action="{
                                show: authStore.permission('user').canDelete(),
                                callback: method_deleteUser,
                                dialogTitle: 'Excluir ' + item.first_name + ' ' + item.last_name + '?',
                                dialogText: 'Ao confirmar, a exclusão deste usuário não poderá mais ser desfeita.'
                            }">

                            <template #columns>
                                <td class="py-4">
                                    <div class="d-flex flex-column align-center">
                                        <user-avatar size="75" :photo_url="item.photo_url" :username="item.username"
                                            class="mb-3" />
                                        <v-chip :prepend-icon="userConfig.levelIcon(item.level)"
                                            :text="userConfig.levelLabel(item.level)"
                                            :color="{ 9: 'warning', 8: 'success' }[item.level]" size="small" />
                                    </div>
                                </td>
                                <td style="width: 100%;" class="py-4">
                                    <detail-group title="Nome:" :text="item.first_name + ' ' + item.last_name" />
                                    <detail-group title="E-mail:" :text="item.email" />
                                </td>
                            </template>

                        </table-list-item>

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
import { userConfig } from '@/utils/config-functions';
import UserAvatar from '@/components/UserAvatar.vue';
import DetailGroup from '@/components/DetailGroup.vue';

/**
 * 
 * Vars, refs, reactives
 * 
 */
const authStore = useAuthStore();

const appStore = useAppStore();

const data = ref({
    users: [],
    pages: []
});

/**
 * 
 * Methohds
 * 
 */
const method_getUsers = (page = 1, filter = null) => {
    return req({
        action: '/admin/users?page=' + page + (filter ? '&' + filter : ''),
        method: 'get',
        success: (resp) => {
            data.value.users = resp.data.users.list;
            data.value.pages = resp.data.users.meta.links;
        }
    });
};

const method_filterUsers = (filterStr) => {
    return method_getUsers(1, filterStr);
};

const method_deleteUser = (d) => {
    return req({
        action: '/admin/users/' + d.id,
        method: 'delete',
        success: () => {
            appStore.addAlert().danger('O usuário foi excluído definitivamente.', 'Excluído!');
            data.value.users.splice(d.index, 1);
        }
    });
};

</script>
