import { writable } from 'svelte/store';
import { Peer } from 'peerjs';
import { openModal, closeModal } from 'svelte-modals';
import ModalComponent from '../lib/ModalComponent.svelte';

export function handleOpening(TipoConnessione: string, peerID: string) {
	console.log('clicked');
	openModal(ModalComponent, {
		title: `You are connected ${TipoConnessione}`,
		message: `You are connected to ${peerID}`,
	});
	setTimeout(() => {
		closeModal();
	}, 3500);
}

export const message = writable('');
export const toSend = writable(false);
export const destID = writable('');
export const MyID = writable('');
export const messageIsMine = writable(0); // 0 = non inviato, 1 = inviato, 2 = ricevuto

export var conn;
export let otherID;
export let ID;
export let testo: string;
let messageIsMineValue: number;

export const peer = new Peer();

peer.on('connection', (connection) => {
	console.log('I am in peer.on(connection)');
	conn = connection;
	//console.log(connection);
	//console.log(conn);
	console.log('Connected passively to: ' + conn.peer);
	console.log('conn.open è: ' + conn.open);

	conn.on('open', () => {
		// handle avviso a schermo della avvenuta connessione
		handleOpening('Passively', conn.peer);

		console.log('Connected');

		if (conn.open) {
			console.log('conn.open è true');
		}

		conn.on('data', (data) => {
			console.log('Received dal connected passively: ', data);
			messageIsMine.set(2);
			message.set(data);
		});
	});
});

destID.subscribe((value) => {
	otherID = value;
	conn = peer.connect(otherID);

	conn.on('open', () => {
		// handle avviso a schermo della avvenuta connessione
		handleOpening('Actively', conn.peer);

		console.log('Connected');

		if (conn.open) {
			console.log('conn.open è true');
		}

		conn.on('data', (data) => {
			console.log('Received dal destID.subscribe: ', data);
			messageIsMine.set(2);
			message.set(data);
		});
	});
});

MyID.subscribe((value) => {
	ID = value;
});

message.subscribe((value) => {
	testo = value;

	if (testo.length > 0 && conn != null && messageIsMineValue != 2) {
		try {
			messageIsMine.set(1);
			conn.send(testo);
		} catch (error) {
			console.log('Errore: ' + error);
		}
		console.log('Sent: ', testo);
	}
});

messageIsMine.subscribe((value) => {
	messageIsMineValue = value;
});

conn.on('open', () => {
	console.log('Connected');

	if (conn.open) {
		console.log('conn.open è true');
	}

	conn.on('data', (data) => {
		console.log('Received: ', data);
	});
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
