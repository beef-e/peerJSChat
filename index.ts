import { Peer } from 'peerjs';
import { writable } from 'svelte/store';
export const message = writable('');
export const toSend = writable(false);

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

export { peer };
