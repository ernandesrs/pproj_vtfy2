// Utilities
import { defineStore } from 'pinia';
import { add as alert_add, get as alert_get } from '@/utils/alert';

const setTitlebar = (appInstance) => {
	document.title = '[' + appInstance.name + (appInstance.subname ? ' ' + appInstance.subname : '') + '] ' + appInstance.breadcrumbs.map((bread) => {
		return bread.text;
	}).join(' » ');
}

export const useAppStore = defineStore('app', {
	state: () => ({
		name: import.meta.env.VITE_APP_NAME,
		subname: null,
		app: null,
		breadcrumbs: [],

		alert: {}
	}),

	getters: {
		/**
		 * 
		 * App
		 * 
		 */
		getName() {
			return this.name;
		},

		getSubname() {
			return this.subname;
		},

		getApp() {
			return this.app;
		},

		inAdmin() {
			return this.app == 'admin';
		},

		inAuth() {
			return this.app == 'auth';
		},

		getBreadcrumbs() {
			return this.breadcrumbs;
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
		setBreadcrumbs(breadcrumbs = []) {
			if (this.inAdmin) {
				this.breadcrumbs = [
					{
						text: 'Início',
						to: {
							name: this.inAdmin ? 'admin.home' : ''
						},
						disabled: false
					},
					...breadcrumbs
				];
			} else {
				this.breadcrumbs = breadcrumbs;
			}

			setTitlebar(this);
		},

		setApp(app, subname = null) {
			this.app = app;
			this.subname = subname;
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
