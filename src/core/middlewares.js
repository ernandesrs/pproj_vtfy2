import token from '@/utils/token';
import { request } from '@/plugins/axios';
import { useAuthStore } from '@/store/user/auth';
import { useAppStore } from '@/store/app';

const redirectors = {
    /**
     * Redirect if user is not authenticated
     * 
     * @param {*} to 
     * @param {*} from 
     * @param {*} next 
     */
    unauthenticated: async (to, from, next) => {
        let theToken = token.get();

        if (!theToken) {
            next({ name: 'auth.login' });
        } else {
            await request({
                action: '/me',
                method: 'get'
            }).then((resp) => {
                useAuthStore().addUser(resp.data.user);

                next();
            }).catch((resp) => {
                useAppStore().addAlert().error(resp.response?.data?.error);
                token.remove();
                next({ name: 'auth.login' });
            });
        }

    },

    /**
     * Redirect if has authenticated user
     * 
     * @param {*} to 
     * @param {*} from 
     * @param {*} next 
     */
    authenticated: (to, from, next) => {
        let theToken = token.get();
        let route = null;

        if (theToken) {
            route = { name: 'admin.home' };
        }

        next(route);
    }
};

const authorizer = {
    adminAccess: (to, from, next) => {
        let route = null;

        if (!useAuthStore().hasAdminAccess) {
            route = { name: 'home' };
        }

        next(route);
    },
    listAccess: (to, from, next) => {
        let route = null;

        if (!useAuthStore().permission(to.name).canViewAny()) {
            useAppStore()
                .addAlert()
                .denyAcess(from.name ? false : true);
            route = {
                name: 'admin.home'
            };
        }

        return next(route);
    },
    showAccess: (to, from, next) => {
        let route = null;

        if (!useAuthStore().permission(to.name).canView()) {
            useAppStore()
                .addAlert()
                .denyAcess(from.name ? false : true);
            route = {
                name: 'admin.home'
            };
        }

        return next(route);
    },
    createAccess: (to, from, next) => {
        let route = null;

        if (!useAuthStore().permission(to.name).canCreate()) {
            useAppStore()
                .addAlert()
                .denyAcess(from.name ? false : true);
            route = {
                name: 'admin.home'
            };
        }

        return next(route);
    },
    updateAccess: (to, from, next) => {
        let route = null;

        if (!useAuthStore().permission(to.name).canUpdate()) {
            useAppStore()
                .addAlert()
                .denyAcess(from.name ? false : true);
            route = {
                name: 'admin.home'
            };
        }

        return next(route);
    }
};

const configurator = {
    inAdmin: () => {
        useAppStore().setApp('admin', 'ADMIN');
    },

    inAuth: () => {
        useAppStore().setApp('auth', '');
    }
};

export default {
    redirectIf: redirectors,
    authorization: authorizer,
    configurator: configurator
};