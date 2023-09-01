// Utilities
import { request } from '@/plugins/axios'
import token from '@/utils/token';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        roles: null
    }),

    getters: {
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
                this.user = user;
                this.roles = user.roles;
            });
        }
    }
})
