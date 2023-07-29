import { Peer } from 'peerjs';
import { writable } from 'svelte/store';
import { setContext } from 'svelte';
//import { otherID } from 'src/lib/Header.svelte'
//let otherID = writable('');
//export { otherID };

const peer = new Peer();

let peerID;

peer.on('open', (id) => {
	/*return new Promise((resolve, reject) => {
		peerID = id;
		resolve(id);
	});*/

	peerID = id;
	console.log('My peer ID is: ' + id);
});

export { peer };
