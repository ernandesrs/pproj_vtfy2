// Utilities
import { defineStore } from 'pinia'
import { add as alert_add, get as alert_get } from '@/utils/alert';

export const useAppStore = defineStore('app', {
	state: () => ({
		name: import.meta.env.VITE_APP_NAME,

		alert: {}
	}),

	getters: {
		getName() {
			return this.name;
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
		updateTitleBar(page) {
			document.title = '[' + this.name + '] ' + page;
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
