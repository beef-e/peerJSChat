<script>
import { onMount } from "svelte";
import {peer} from "../..";
import { message } from "../utils/utils"
import { toSend } from "../utils/utils"
import { destID, MyID } from "../utils/utils";
//import {connectFunction} from "../..";
let otherID;
let fastID;

function connectPeer(){
    /*conn=peer.connect(otherID);
    console.log("Connected to " + otherID);

    // Handling di input e output dati
    conn.on("open", ()=>{
        //invio un messaggio al mio interlocutore
        if ($toSend) {
            conn.send("Hello from " + peer.id);
            console.log("Sent message: " +$message);
        }

        // Ricezione di un messaggio dal mio interlocutore
        conn.on("data", (data)=>{
            //creare un nuovo messaggio del mio interlocutore
            console.log("Received data: " + data);
        });
    });*/

    destID.set(otherID);
    console.log("Connected to " + $destID);
    //connectFunction($destID);
};

onMount(async () => {
    await setTimeout(() => {}, 1500);
    //$MyID = prompt("Insert your ID")+(Math.random()*100).toString();
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
