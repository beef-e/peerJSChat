import { Peer } from 'peerjs';
import { writable } from 'svelte/store';
import { testo } from './src/utils/utils';
//import { otherID } from './src/utils/utils';

const peer = new Peer();

let peerID;

peer.on('open', (id) => {
	peerID = id;
	console.log('My peer ID is: ' + id);
});

//? un remote peer si connette a me
peer.on('connection', (conn) => {
	/*conn.on('data', (data) => {
		console.log('Received', data);
	});*/

	//? anche io mi connetto al remote peer
	const otherID = conn.peer;
	connectFunction(otherID);

	/*const idInterlocutore = conn.peer;
	const RimandoConn = peer.connect(idInterlocutore);

	RimandoConn.on('open', () => {
		console.log('Connected');

		// Receive messages
		RimandoConn.on('data', (data) => {
			console.log('Received', data);
		});
	});*/
});

export function connectFunction(destID) {
	// mi connetto al remote peer
	console.log('funzione connessione...');
	const conn = peer.connect(destID);

	conn.on('open', () => {
		console.log('Connected');

		// Receive messages
		conn.on('data', (data) => {
			console.log('Received', data);
		});

		// Send messages
		if (testo.validate()) {
			console.log('Sending ', testo);
			conn.send(testo);
		}
	});
}

export { peer };
