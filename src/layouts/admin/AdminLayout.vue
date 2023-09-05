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

            <template #append>
                <v-btn-group variant="text">
                    <v-btn icon="mdi-bell-outline" size="small" :ripple="false" />
                    <v-btn @click="method_toggleTheme" icon="mdi-brightness-6" size="small" :ripple="false" />
                    <v-btn icon="mdi-account-circle-outline" id="profile-activator" />
                </v-btn-group>

                <v-menu activator="#profile-activator" width="220px">
                    <v-list>
                        <v-list-item class="py-4 px-6">
                            <div class="d-flex flex-column align-center">
                                <user-avatar :username="authStore.getFullName" :photo_url="authStore.getPhotoUrl"
                                    :size=125 />
                                <p class="mt-2 mb-5 text-h6 text-grey-darken-2">{{ authStore.getFullName }}</p>
                                <div class="d-flex justify-space-between align-center w-100">
                                    <v-btn :to="{ name: 'admin.profile' }" prepend-icon="mdi-account-circle" text="Perfil" color="primary" size="small"
                                        variant="outlined" :disabled="route.name === 'admin.profile'" />
                                    <v-btn @click.stop="authStore.logout" prepend-icon="mdi-logout" text="Sair" color="danger" size="small" variant="plain" />
                                </div>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
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
import { useTheme } from 'vuetify';
import UserAvatar from '@/components/UserAvatar.vue';

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
const theme = useTheme();

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
            {
                text: 'Funções',
                to: { name: 'admin.roles' },
                icon: 'mdi-medal',
                activeIn: ['admin.roles', 'admin.roles.create', 'admin.roles.show', 'admin.roles.edit']
            },
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
const method_toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'cDark'
};

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
