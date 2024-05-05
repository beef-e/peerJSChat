import { writable } from 'svelte/store';
import { Peer } from 'peerjs';
import { openModal, closeModal } from 'svelte-modals';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
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

function casualAccessories() {
	const accessories = [
		'catEars',
		'clownNose',
		'glasses',
		'mustache',
		'sailormoonCrown',
		'sleepMask',
		'sunglasses',
	];
	const randomIndex = Math.floor(Math.random() * accessories.length);
	const accessorio = accessories[randomIndex];
	return accessorio;
}

function casualAvatarEyes() {
	const eyes = ['angry', 'cheery', 'confused', 'normal', 'sad', 'sleepy', 'starstruck', 'winking'];
	const randomIndex = Math.floor(Math.random() * eyes.length);
	const eye = eyes[randomIndex];
	return eye;
}

function casualAvatarHair() {
	const hair = [
		'bangs',
		'bowlCutHair',
		'bunHair',
		'braids',
		'curlyBob',
		'curlyShortHair',
		'froBun',
		'halfShavedHead',
		'mohawk',
		'shavedHead',
		'shortHair',
		'straightHair',
		'wavyBob',
	];
	const randomIndex = Math.floor(Math.random() * hair.length);
	const capelli = hair[randomIndex];
	const hairColor = randomIndex % 2 == 0 ? '3a1a00' : 'e9b729'; // brown or blonde
	return [capelli, hairColor];
}

function casualAvatarSkinColor() {
	const skinColors = ['8c5a2b', 'a47539', 'e2ba87'];
	const randomIndex = Math.floor(Math.random() * skinColors.length);
	const skinColor = skinColors[randomIndex];
	return skinColor;
}

function casualAvatar(
	seed = 'Felix',
	avatarSize: number = 32,
	accessorio = casualAccessories(),
	occhio = casualAvatarEyes(),
	//bgColor = 'ffffff',
	hairStyle = casualAvatarHair(),
	skinColor = casualAvatarSkinColor()
) {
	const avatar = createAvatar(bigSmile, {
		seed: seed,
		size: avatarSize,
		// @ts-expect-error
		accessories: [accessorio],
		// @ts-expect-error
		eyes: [occhio],
		//backgroundColor: [bgColor],
		backgroundType: ['gradientLinear'],
		// @ts-expect-error
		hair: [hairStyle[0]],
		hairColor: [hairStyle[1]],
		skinColor: [skinColor],
	});

	return avatar;
}

const avatar = casualAvatar();
export const avatarSvg = avatar.toString();

export const otherAvatar = writable('');
export const message = writable('');
export const toSend = writable(false);
export const destID = writable('');
export const MyID = writable('');
export const messageIsMine = writable(0); // 0 = non inviato, 1 = inviato, 2 = ricevuto

export var conn;
export let otherID = '';
export let ID;
export let testo: string;
let messageIsMineValue: number;
/*export let personalID: string;*/

export let peer = new Peer();

export function rePeer(id) {
	peer.destroy();
	peer = new Peer(id);
	console.log('peer.id is: ' + peer.id);

	peer.on('connection', (connection) => {
		conn = connection;
		console.log('Connected passively to: ' + conn.peer);
		otherID = conn.peer;

		conn.on('open', () => {
			// handle avviso a schermo della avvenuta connessione
			handleOpening('Passively', conn.peer);

			let primoMess = true;

			if (conn.open) {
				conn.send(avatarSvg);
			}

			conn.on('data', (data) => {
				// handling della ricezione dell'avatar
				if (primoMess) {
					primoMess = false;
					otherAvatar.set(data);
				} else {
					messageIsMine.set(2);
					message.set(data);
				}
			});
		});
	});
}

destID.subscribe((value) => {
	otherID = value;
	conn = peer.connect(otherID);

	conn.on('open', () => {
		// handle avviso a schermo della avvenuta connessione
		handleOpening('Actively', conn.peer);
		let primoMess = true;

		if (conn.open) {
			conn.send(avatarSvg);
		}

		conn.on('data', (data) => {
			// handling della ricezione dell'avatar
			if (primoMess) {
				primoMess = false;
				otherAvatar.set(data);
			} else {
				messageIsMine.set(2);
				message.set(data);
			}
		});
	});
});

MyID.subscribe((value) => {
	ID = value;
});

messageIsMine.subscribe((value) => {
	messageIsMineValue = value;
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

export function actualSend(message: string) {
	if (message.length > 0 && conn != null && messageIsMineValue != 2 && validate(message)) {
		try {
			messageIsMine.set(1);
			conn.send(message);
		} catch (error) {
			console.log('Errore: ' + error);
		}
	}
}
