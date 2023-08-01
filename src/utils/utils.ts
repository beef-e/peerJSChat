import { writable } from 'svelte/store';

export const message = writable('');
export const toSend = writable(false);
export const destID = writable('');
export let otherID;
export let testo;

destID.subscribe((value) => {
	otherID = value;
});

message.subscribe((value) => {
	testo = value;
});

// funzione per eliminare gli spazi e identificare i messaggi vuoti
//! Restituisce false se il messaggio è vuoto
export function validate(text: string) {
	text = text.replaceAll(' ', '');
	if (text == '') {
		return false;
	} else {
		return true;
	}
}
