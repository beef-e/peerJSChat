import { writable } from 'svelte/store';

export const message = writable('');
export const toSend = writable(false);
export const destID = writable('');
export let otherID;

destID.subscribe((value) => {
	otherID = value;
});
