import { writable } from 'svelte/store';
import type { Package } from '$lib/types';

export const selectedPackageStore = writable<Package | null>(null);
