<script>
import { peer } from "../..";
import { message } from "../../index"
import { toSend } from "../../index"
export let conn 
export let messaggio;

function sendMessage(){
    message.set(messaggio);
    messaggio = "";
    console.log($message);
    toSend.set(true);
    console.log($toSend);
}
</script>


<div class="writing-div">
    <input type="text" placeholder="Scrivi un messaggio" bind:value={messaggio}/>
    <button on:click={sendMessage}>Invia</button>
</div>

<style>
    input{
        padding-left: 1.5%;
    }
</style>