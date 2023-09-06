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
                    <!-- notifications -->
                    <v-btn :prepend-icon="notificationStore.unread ? 'mdi-bell-ring-outline' : null"
                        :icon="notificationStore.unread == 0 ? 'mdi-bell-outline' : null"
                        :color="notificationStore.unread ? 'warning' : 'grey-lighten-1'"
                        :class="[notificationStore.unread ? 'has-notifications' : '']" id="notifications-activator"
                        :text="notificationStore.unread + ''" size="small" />
                    <!-- /notifications -->

                    <!-- theme toggler -->
                    <v-btn @click="appStore.toggleTheme()" icon="mdi-brightness-6" size="small" :ripple="false" />
                    <!-- /theme toggler -->

                    <!-- user profile -->
                    <v-btn icon="mdi-account-circle-outline" id="profile-activator" />
                    <!-- /user profile -->
                </v-btn-group>

                <!-- nofitications menu -->
                <v-menu activator="#notifications-activator" :close-on-content-click="false" width="350px"
                    max-height="475px">

                    <v-list lines="two" class="pa-4">
                        <v-list-subheader class="mb-3">
                            <span class="text-body-1 mr-2">Notificações</span>
                            <v-btn text="Ver todas" append-icon="mdi-arrow-right" variant="plain" size="small" />
                        </v-list-subheader>

                        <v-list-item v-for="not in notificationStore.getAll" :key="not.id" :title="not.title"
                            :subtitle="not.description" :active="not.read_at ? false : true" color="info" class="mb-2">
                            <template #prepend>
                                <v-icon :icon="not.icon" />
                            </template>
                            <template #append>
                                <v-btn @click.stop="notificationStore.markAsRead(not.id)" color="grey-darken-1"
                                    icon="mdi-check-circle" variant="plain"
                                    :style="[not.read_at ? 'pointer-events:none;opacity:0.2;' : '']"></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>

                </v-menu>

                <!-- profile menu -->
                <v-menu activator="#profile-activator" :close-on-content-click="false" width="220px">
                    <v-list>
                        <v-list-item class="py-4 px-6">
                            <div class="d-flex flex-column align-center">
                                <user-avatar :username="authStore.getFullName" :photo_url="authStore.getPhotoUrl"
                                    :size=125 />
                                <p class="mt-2 mb-5 text-h6 text-grey-darken-2">{{ authStore.getFullName }}</p>
                                <div class="d-flex justify-space-between align-center w-100">
                                    <v-btn :to="{ name: 'admin.profile' }" prepend-icon="mdi-account-circle" text="Perfil"
                                        color="primary" size="small" variant="outlined"
                                        :disabled="route.name === 'admin.profile'" />
                                    <v-btn @click.stop="authStore.logout" prepend-icon="mdi-logout" text="Sair"
                                        color="danger" size="small" variant="plain" />
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
import { useNotificationStore } from '@/store/notifications';
import UserAvatar from '@/components/UserAvatar.vue';
import { onUpdated } from 'vue';

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

const notificationStore = useNotificationStore();

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
notificationStore.load();
appStore.setTheme();

onUpdated(() => {
    notificationStore.load();
});

</script>

<style scoped>
.has-notifications {
    animation: hasNotifications .75s ease 0s infinite alternate backwards;
}

@keyframes hasNotifications {
    0% {
        animation-timing-function: ease-out;
        transform: scale(1);
        transform-origin: center center;
    }

    10% {
        animation-timing-function: ease-in;
        transform: scale(0.91);
    }

    17% {
        animation-timing-function: ease-out;
        transform: scale(0.98);
    }

    33% {
        animation-timing-function: ease-in;
        transform: scale(0.87);
    }

    45% {
        animation-timing-function: ease-out;
        transform: scale(1);
    }
}
</style>