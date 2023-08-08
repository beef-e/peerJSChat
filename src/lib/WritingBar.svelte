<script>
import { message } from "../utils/utils"
let messaggio;

function sendMessage(){
    message.set(messaggio);
    messaggio = "";
}
</script>


<form class="writing-div" on:submit|preventDefault={sendMessage}>
    <input type="text" placeholder="Scrivi un messaggio" bind:value={messaggio}/>
    <button type="submit">Invia</button>
</form>

<style>
    input{
        padding-left: 1.5%;
    }
</style>