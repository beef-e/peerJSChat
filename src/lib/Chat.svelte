<script>
// @ts-nocheck

    import WritingBar from "./WritingBar.svelte";
    import MessageComponent from "./MessageComponent.svelte";
    import MessageComponentLeft from "./MessageComponentLeft.svelte";

    import {messageIsMine} from "../utils/utils";

    function createNewComponent() {
        if($messageIsMine===1){
            const element = new MessageComponent({
                target: document.querySelector('.effective-chat'),
                anchor: document.querySelector('.writing-div')
            })
        }else if($messageIsMine===2){
            const element = new MessageComponentLeft({
                target: document.querySelector('.effective-chat'),
                anchor: document.querySelector('.writing-div')
            })
        }
    }
</script>

<div class="chat-div">
<div class="effective-chat" use:createNewComponent>
    <!--Component dei messaggi-->
    <!--<MessageComponent></MessageComponent>
    <MessageComponentLeft></MessageComponentLeft>
    <MessageComponent></MessageComponent>-->

    <slot></slot>

    <!--<WritingBar funzione={theFunction}></WritingBar>-->
    <WritingBar></WritingBar>
    <!--Component della barra di scrittura-->
</div>
</div>

<style lang="scss">
.chat-div{
    div{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
}
</style>
