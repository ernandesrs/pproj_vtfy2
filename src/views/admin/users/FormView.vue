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
    ]" :requests="[]">
        <template #content>
            <content-elem>
                <template #content>

                    Formulário de usuário

                </template>
            </content-elem>
        </template>
    </base-view>
</template>

<script setup>

import ContentElem from '@/components/ContentElem.vue';
import BaseView from '@/layouts/admin/BaseView';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const computed_isCreating = computed(() => {
    return route.params?.user_id ? false : true;
});

</script>
