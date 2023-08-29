// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		name: import.meta.env.VITE_APP_NAME
	}),

	getters: {
		getName: (state) => {
			return state.name;
		}
	}
})
