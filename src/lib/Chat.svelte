<script>
    import WritingBar from "./WritingBar.svelte";
    import MessageComponent from "./MessageComponent.svelte";
    import MessageComponentLeft from "./MessageComponentLeft.svelte";
</script>

<div class="chat-div">
<div class="effective-chat">
    <!--Component dei messaggi-->
    <!--<MessageComponent></MessageComponent>
    <MessageComponentLeft></MessageComponentLeft>
    <MessageComponent></MessageComponent>-->

    <slot></slot>

    <!--<WritingBar funzione={theFunction}></WritingBar>-->
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
