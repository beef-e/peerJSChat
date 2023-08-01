import { writable } from 'svelte/store';
import { Peer } from 'peerjs';

export const message = writable('');
export const toSend = writable(false);
export const destID = writable('');
export const MyID = writable('');

export var conn;
export let otherID;
export let ID;
export let testo: string;

export const peer = new Peer();

peer.on('connection', (connection) => {
	conn = connection;
});

destID.subscribe((value) => {
	otherID = value;
	conn = peer.connect(otherID);
});

MyID.subscribe((value) => {
	ID = value;
});

message.subscribe((value) => {
	testo = value;

	if (testo.length > 0) {
		conn.send(testo);
		console.log('Sent: ', testo);
	}
});

conn.on('open', () => {
	console.log('Connected');
});

conn.on('data', (data) => {
	console.log('Received: ', data);
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
