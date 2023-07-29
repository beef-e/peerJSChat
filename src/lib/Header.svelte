<script>
import { onMount } from "svelte";
//import {peerID} from "../.."
//import {otherID} from "../.."
import { writable } from "svelte/store";
//let myPeerID: string;
//let isPeerIDSet = false;
//let peerIDString;
//let otherIDString=writable("");
/*otherIDString.subscribe(value => {
    // @ts-ignore
    otherIDString=value;
});

/*onMount(async () => {
    peerID.then(()=>{
        peerIDString=peerID.toString();
        isPeerIDSet = true;
    })
});*/

/*function trasferisciOtherID() {
    console.log("trasferisco " + otherIDString);
    // @ts-ignore
    otherID.set(otherIDString);
}*/

import {peer} from "../..";
let otherID;
let fastID;

function connectPeer(){
    try {
        peer.connect(otherID);
        console.log("Connected to " + otherID);
    } catch (error) {
        console.log("The following error occurred: " +error);
    }
}

onMount(async () => {
    await setTimeout(() => {}, 2000);
});

function handleClick() {
    navigator.clipboard.writeText(peer.id);
    alert("Copied to clipboard!");
    fastID = peer.id;
}

</script>

<header>
    <h1>PeerChat</h1>

    <nav>
        <ul>
            <li><a href="https://github.com/beef-e/peerJSChat">About</a></li>
            {#await peer.id||fastID then }
                {#if peer.id || fastID}
                    <li><span on:click={handleClick}>My ID: {peer.id || fastID}</span></li>
                    {:else}
                    <li><span on:click={handleClick}>My ID: Loading...</span></li>
                {/if}
            {/await}
            <li><input type="text" name="otherID" id="otherID" placeholder="Insert another ID" bind:value={otherID}><button on:click={connectPeer}>Connect</button></li>
        </ul>
    </nav>
</header>
