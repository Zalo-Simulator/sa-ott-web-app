import { writable } from 'svelte/store';

export const pageHomeClass = writable('');
export const currentUser = writable<any>({});