// Utilities
import { defineStore } from 'pinia';
import { add as alert_add, get as alert_get } from '@/utils/alert';

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
