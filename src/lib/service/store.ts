import { writable } from 'svelte/store';
import { WebSocketClient } from '$lib/service/web-socket-client'


export const pageHomeClass = writable('');
export const currentUser = writable<any>({});
export const wsClient = writable<WebSocketClient>();