import { writable } from 'svelte/store';

export type AppMode = 'captive' | 'application';

// 'captive' = layar login awal, tanpa bottom nav (fokus otentikasi).
// 'application' = pengguna sudah masuk ke bagian aplikasi manapun selain
// login awal; bottom nav tampil dan tetap tampil walau kembali ke /login.
function createAppModeStore() {
	const { subscribe, set } = writable<AppMode>('captive');

	return {
		subscribe,
		enterApplicationMode() {
			set('application');
		},
		reset() {
			set('captive');
		}
	};
}

export const appModeStore = createAppModeStore();
