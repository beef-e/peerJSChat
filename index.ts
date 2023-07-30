import { Peer } from 'peerjs';
import { writable } from 'svelte/store';
import { otherID } from './src/utils/utils';

const peer = new Peer();

let peerID;

peer.on('open', (id) => {
	peerID = id;
	console.log('My peer ID is: ' + id);
});

peer.on('connection', (conn) => {
	conn.on('data', (data) => {
		console.log('Received', data);
	});
});

export function connectFunction() {
	const conn = peer.connect(otherID);

	conn.on('open', () => {
		console.log('Connected');

		// Receive messages
		conn.on('data', (data) => {
			console.log('Received', data);
		});
	});
}

export { peer };
