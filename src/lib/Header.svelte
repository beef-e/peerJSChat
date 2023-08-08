<script>
import { onMount } from "svelte";
import {peer} from "../..";
import { destID, MyID } from "../utils/utils";
let otherID;
let fastID;

function connectPeer(){
    destID.set(otherID);
    console.log("Connected to " + $destID);
    
};

onMount(async () => {
    await setTimeout(() => {}, 1500);
});

function handleClick() {
    navigator.clipboard.writeText(peer.id);
    alert("Copied to clipboard!");
    MyID.set(peer.id);
    fastID = peer.id;
}
</script>

<header>
    <h1>PeerChat</h1>

    <nav>
        <ul>
            <li class="FirstChild"><a href="https://github.com/beef-e/peerJSChat">About</a></li>
            
            {#await peer.id||fastID then }
                {#if peer.id || fastID}
                    <li><span on:click={handleClick}>My ID: {peer.id || fastID}</span></li>
                    {:else}
                    <li><span on:click={handleClick}>My ID: Loading...</span></li>
                {/if}
            {/await}

            <li class="lastChild"><input type="text" name="otherID" id="otherID" placeholder="Insert another ID" bind:value={otherID}><button on:click={connectPeer}>Connect</button></li>
        </ul>
    </nav>
</header>
