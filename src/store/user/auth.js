// Utilities
import { defineStore } from 'pinia';
import { request } from '@/plugins/axios';
import token from '@/utils/token';
import { useAppStore } from '../app';
import router from '@/router';

const adminAccessLevels = [8, 9];

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

        /**
         * Check if authenticated user has admin access
         * @returns {Boolean}
         */
        hasAdminAccess() {
            return adminAccessLevels.includes(this.user?.level);
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

                token.set(access.full, access.expire_in_minutes);

                this.addUser(user);

                useAppStore().addAlert().success(user.first_name + ', seja bem vindo(a) de volta!', 'Bem vindo(a)!', true);

                router.push({ name: 'admin.home' });
            });
        },

        async logout() {
            return await request({
                action: '/auth/logout',
                method: 'get'
            }).then(() => {
                token.remove();
                this.user = null;
                this.roles = null;
            });
        },

        addUser(user) {
            this.user = user;
            this.roles = user.roles;
        }
    }
})
