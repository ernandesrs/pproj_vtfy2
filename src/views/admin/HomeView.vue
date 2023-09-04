<template>
    <base-view page-title="Dashboard" :page-breadcrumbs="[]" :requests="[
        method_getDashContent
    ]">

        <template #content>
            <content-elem borderless>
                <template #content>
                    <v-row justify="center">
                        <!-- card users -->
                        <v-col cols="12" sm="5" md="4">
                            <card-elem color="primary" icon="mdi-account-group-outline" title="Usuários"
                                :value="data.cards.users.total" :action="{
                                    to: { name: 'admin.users' },
                                    text: 'Ir para usuários'
                                }" />
                        </v-col>
                        <!-- /card users -->

                        <!-- card roles -->
                        <v-col cols="12" sm="5" md="4">
                            <card-elem color="secondary" icon="mdi-shield-account-variant-outline" title="Funções"
                                :value="data.cards.roles.total" :action="{
                                    to: { name: 'admin.home' },
                                    text: 'Ir para funções'
                                }" />
                        </v-col>
                        <!-- /card roles -->

                        <!-- card example -->
                        <v-col cols="12" sm="5" md="4">
                            <card-elem color="info" icon="mdi-text-box-plus-outline" title="Example #1" value="101"
                                :action="{
                                    to: { name: 'admin.home' },
                                    text: 'Example #1'
                                }" />
                        </v-col>
                        <!-- /card example -->
                    </v-row>
                </template>
            </content-elem>
        </template>

    </base-view>
</template>

<script setup>

import { req } from '@/plugins/axios';
import BaseView from '@/layouts/admin/BaseView.vue';
import { ref } from 'vue';
import CardElem from '@/components/CardElem.vue';
import ContentElem from '@/components/ContentElem.vue';

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
const data = ref({
    cards: {
        roles: null,
        users: null
    }
});

/**
 * 
 * Computeds
 * 

/**
 * Methods
 */
const method_getDashContent = () => {
    return req({
        action: '/admin',
        method: 'get',
        success: (resp) => {
            data.value.cards.roles = resp.data.roles;
            data.value.cards.users = resp.data.users;
        }
    });
}

/**
 * 
 * Watchers
 * 
 */

/**
 * Created
 */

</script>

<style lang="scss" scoped></style>