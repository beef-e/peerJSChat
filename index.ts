import { Peer } from 'peerjs';
import { writable } from 'svelte/store';
import { setContext } from 'svelte';
//import { otherID } from 'src/lib/Header.svelte'
let otherID = writable('');
export { otherID };

const peer = new Peer();

let peerID: Promise<string> = Promise.resolve(null);

peer.on('open', (id) => {
	/*return new Promise((resolve, reject) => {
		peerID = id;
		resolve(id);
	});*/

	peerID = Promise.resolve(id);
	return peerID;
	console.log('My peer ID is: ' + id);
});

console.log('il mio peerID: ' + peerID);

try {
	peer.connect(otherID.toString());
} catch (error) {
	console.log('errore connessione');
	console.log(error);
}

try {
	peer.on('connection', (conn) => {
		console.log('connessione stabilita');
	});
} catch (error) {
	console.log('errore connessione seconod try');
	console.log(error);
}

export { peerID };
