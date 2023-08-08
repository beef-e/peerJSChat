import { peer, otherID } from './src/utils/utils';

let peerID;

peer.on('open', (id) => {
	peerID = id;
	console.log('My peer ID is: ' + id);
});

peer.on('error', (err) => {
	// @ts-expect-error
	if (err.type != 'peer-unavailable') {
		if (otherID != '') {
			// @ts-expect-error
			alert('The following error occurred: ' + err.type + ' - ' + err.message);
		}
	}
});

export { peer };
