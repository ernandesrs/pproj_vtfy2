// Utilities
import { defineStore } from 'pinia';
import { add as alert_add, get as alert_get } from '@/utils/alert';
import vuetify from '@/plugins/vuetify';
import cookie from '@/plugins/cookie';

const THEME_NAME_KEY = 'theme_name';

/**
* Set dark theme
* @param {null|String} themeName 
*/
const themeSet = (themeName = null) => {
	const definedThemeName = cookie.get(THEME_NAME_KEY);

	if (!themeName) {
		if (!definedThemeName) {
			themeName = 'light';
		} else {
			themeName = definedThemeName;
		}
	}

	cookie.set(THEME_NAME_KEY, themeName);

	vuetify.theme.global.name.value = themeName;
};

export const useAppStore = defineStore('app', {
	state: () => ({
		name: import.meta.env.VITE_APP_NAME,
		subname: null,
		app: null,

		alert: {}
	}),

	getters: {
		/**
		 * 
		 * App
		 * 
		 */
		isDemo() {
			return import.meta.env.VITE_APP_DEMO;
		},

		getName() {
			return this.name;
		},

		getSubname() {
			return this.subname;
		},

		getApp() {
			return this.app;
		},

		themeIsDark() {
			return (cookie.get(THEME_NAME_KEY) ?? 'light') === 'cDark';
		},

		inAdmin() {
			return this.app == 'admin';
		},

		inAuth() {
			return this.app == 'auth';
		},

		/**
		 * 
		 * Alert
		 * 
		 */
		hasAlert() {
			return this.alert?.text ? true : false;
		},

		getAlert() {
			return this.alert;
		},

		hasFlashAlert() {
			return alert_get.hasFlash;
		},

		getFlashAlert() {
			return alert_get.getFlash;
		}
	},

	actions: {
		setApp(app, subname = null) {
			this.app = app;
			this.subname = subname;
		},

		toggleTheme() {
			themeSet(vuetify.theme.global.current.value.dark ? 'light' : 'cDark');
		},

		setTheme() {
			return themeSet();
		},

		/**
		 * 
		 * Alert
		 * 
		 */
		addAlert() {
			return alert_add;
		},

		setAlert(alert) {
			this.alert = alert;
		}
	}
})
