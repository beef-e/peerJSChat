<script>
import { onMount } from "svelte";
import {peerID} from "../.."
import {otherID} from "../.."
import { writable } from "svelte/store";
//let myPeerID: string;
let isPeerIDSet = false;
let peerIDString;
let otherIDString=writable("");
otherIDString.subscribe(value => {
    // @ts-ignore
    otherIDString=value;
});

onMount(async () => {
    peerID.then(()=>{
        peerIDString=peerID.toString();
        isPeerIDSet = true;
    })
});

function trasferisciOtherID() {
    console.log("trasferisco " + otherIDString);
    // @ts-ignore
    otherID.set(otherIDString);
}

</script>

<header>
    <h1>PeerChat</h1>

    <nav>
        <ul>
            <li><a href="https://github.com/beef-e/peerJSChat">About</a></li>
            {#if isPeerIDSet}
            <li><a href="#">My ID: {peerIDString}</a></li>
            {/if}
            <li><input type="text" name="otherID" id="otherID" placeholder="Insert another ID" bind:value={otherIDString}><button on:click={trasferisciOtherID}>Connect</button></li>
        </ul>
    </nav>
</header>
