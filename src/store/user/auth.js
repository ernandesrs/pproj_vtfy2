// Utilities
import { defineStore } from 'pinia';
import { request } from '@/plugins/axios';
import token from '@/utils/token';
import { useAppStore } from '../app';
import router from '@/router';
import permissions from '@/core/permissions';

const SUPER_LEVEL = 9;
const ADMIN_LEVEL = 8;
const adminAccessLevels = [SUPER_LEVEL, ADMIN_LEVEL];

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        roles: null
    }),

    getters: {
        /**
         * Check if has a authenticated user
         * 
         * @returns {Boolean}
         */
        isAuth() {
            return this.user?.id ? true : false;
        },

        isSuperuser() {
            return this.user.level == SUPER_LEVEL;
        },

        /**
         * Check if authenticated user has admin access
         * @returns {Boolean}
         */
        hasAdminAccess() {
            return adminAccessLevels.includes(this.user?.level);
        },

        getUser() {
            return this.user;
        },

        getFirstName() {
            return this.user.first_name;
        },

        getLastName() {
            return this.user.last_name;
        },

        getFullName() {
            return this.getFirstName + ' ' + this.getLastName;
        },

        getEmail() {
            return this.user.email
        },

        getPhotoUrl() {
            return this.user?.photo_url ?? null;
        },

        permission() {
            return permissions.addUser(this).addResource;
        }
    },

    actions: {
        async login(email, pass) {
            return await request({
                action: '/auth/login',
                method: 'post',
                data: {
                    email: email,
                    password: pass
                }
            }).then((resp) => {
                let user = resp.data.user;
                let access = resp.data.access;

                this.authAndRedirect(user, access.full, access.expire_in_minutes);
            });
        },

        socialLogin(fullToken, expire_in_minutes) {
            this.authAndRedirect(null, fullToken, expire_in_minutes);
        },

        authAndRedirect(user, fullToken, expire_in_minutes) {
            token.set(fullToken, expire_in_minutes);

            if (user) {
                this.addUser(user);
                useAppStore().addAlert().success(user.first_name + ', seja bem vindo(a) de volta!', 'Bem vindo(a)!', true);
            } else {
                useAppStore().addAlert().success('Seja bem vindo(a) de volta!', 'Bem vindo(a)!', true);
            }

            router.push({ name: 'admin.home' });
        },

        async logout() {
            return await request({
                action: '/auth/logout',
                method: 'get'
            }).then(() => {
                token.remove();

                useAppStore().addAlert().danger('Você encerrou sua sessão com sucesso.', 'Sessão encerrada!', true);
                router.push({ name: 'auth.login' });
            });
        },

        addUser(user) {
            this.user = user;
            this.roles = user.roles;
        }
    }
})
