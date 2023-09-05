<template>
    <v-layout>
        <!-- alert -->
        <alert-elem />
        <!-- /alert -->

        <!-- navigation -->
        <v-navigation-drawer v-model="showNavigation" elevation="10" color="navigation-bg" class="pa-4">
            <!-- head -->
            <div class="text-center mb-3">
                <v-icon icon="$vuetify" :size="75"></v-icon>
                <v-app-bar-title>
                    <span class="font-weight-bold">{{ appStore.getName }}</span><span class="font-weight-light">{{
                        appStore.getSubname }}</span>
                </v-app-bar-title>
            </div>
            <!-- /head -->

            <v-list>
                <template v-for="item in navItems" :key="item">
                    <!-- individual item -->
                    <v-list-item v-if="!item?.items" :prepend-icon="item.icon" :title="item.text" :to="item?.to"
                        @click="sItem?.call ? sItem.call() : null"
                        :active="item?.to && item.activeIn.includes(route.name)" />
                    <!-- /individual item -->

                    <!-- items group -->
                    <v-list-group v-else>

                        <!-- submenu activator -->
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :prependIcon="item?.icon" :title="item?.text" />
                        </template>

                        <!-- submenu items -->
                        <v-list-item v-for="sItem in item?.items" :key="sItem" :prependIcon="sItem?.icon"
                            :title="sItem?.text" :to="sItem?.to" @click="sItem?.call ? sItem.call() : null"
                            :active="item?.to && item.activeIn.includes(route.name)" />
                    </v-list-group>
                    <!-- /items group -->
                </template>
            </v-list>

            <template #append>
                <v-list>
                    <v-list-item v-for="item in endNavItems" :key="item" :prependIcon="item?.icon" :title="item?.text"
                        :to="item?.to" @click="item?.call ? item?.call() : null" />
                </v-list>
            </template>
        </v-navigation-drawer>
        <!-- /navigation -->

        <!-- appbar -->
        <v-app-bar density="compact" elevation="0" class="border-b">
            <v-app-bar-nav-icon variant="text" @click.stop="showNavigation = !showNavigation" />
        </v-app-bar>
        <!-- /appbar -->

        <v-main>
            <router-view />
        </v-main>
    </v-layout>
</template>

<script setup>

import AlertElem from '@/components/AlertElem.vue';
import { ref } from 'vue';
import { useAppStore } from '@/store/app';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/user/auth';

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
const appStore = useAppStore();

const authStore = useAuthStore();

const route = useRoute();

const showNavigation = ref(true);

const navItems = [
    {
        text: 'Dashboard',
        to: { name: 'admin.home' },
        icon: 'mdi-chart-pie',
        activeIn: ['admin.home']
    },
    {
        text: 'Usuários',
        to: { name: 'admin.users' },
        icon: 'mdi-account-group',
        activeIn: ['admin.users', 'admin.users.create', 'admin.users.show', 'admin.users.edit']
    },
    {
        text: 'Configurações',
        icon: 'mdi-cog',
        activeIn: [],
        items: [
        ]
    },
];

const endNavItems = [
    {
        text: 'Perfil',
        to: { name: 'admin.profile' },
        icon: 'mdi-account',
        activeIn: ['admin.profile']
    },
    {
        text: 'Logout',
        call: () => {
            authStore.logout();
        },
        icon: 'mdi-logout',
        activeIn: []
    }
];

/**
 * Methods
 */
const method_navigationStatus = () => {
    if (window.innerWidth <= 1280) {
        showNavigation.value = false;
    }
};

/**
 * 
 * Watchers
 * 
 */

/**
 * Created
 */
method_navigationStatus();

</script>
