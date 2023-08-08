<script>
// @ts-nocheck

    import WritingBar from "./WritingBar.svelte";
    import MessageComponent from "./MessageComponent.svelte";
    import MessageComponentLeft from "./MessageComponentLeft.svelte";

    import {messageIsMine} from "../utils/utils";
    import {message} from "../utils/utils";

    $: if($messageIsMine===1){
            const element = new MessageComponent({
                target: document.querySelector('.target'),
                anchor: document.querySelector('#message-div'),
                props: {
                    text: $message
                }
            })
            messageIsMine.set(0);
        }else if($messageIsMine===2){
            const element = new MessageComponentLeft({
                target: document.querySelector('.target'),
                anchor: document.querySelector('#message-div'),
                props: {
                    text: $message
                }
            })
            messageIsMine.set(0);
        }
</script>

<div class="chat-div">
    <div class="effective-chat">

        <div class="invisible">
            <div class="invisible overflow target">
                <slot></slot>
            </div>
        </div>


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
