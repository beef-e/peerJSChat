<script lang="ts">
// @ts-nocheck
    import { afterUpdate, onMount } from "svelte";

    import WritingBar from "./WritingBar.svelte";
    import MessageComponent from "./MessageComponent.svelte";
    import MessageComponentLeft from "./MessageComponentLeft.svelte";

    import {messageIsMine} from "../utils/utils";
    import {message, avatarSvg, otherAvatar} from "../utils/utils";

    let element: HTMLElement;

    $: if($messageIsMine===1){
            const element = new MessageComponent({
                target: document.querySelector('.target'),
                //anchor: document.querySelector('.writing-div'),
                //anchor: document.querySelector('.fakey'),
                //anchor: document.querySelector('#message-div'),
                //anchor: document.querySelector('#message-div-left'),
                props: {
                    text: $message
                }
            })
            messageIsMine.set(0);
        }else if($messageIsMine===2){
            const element = new MessageComponentLeft({
                target: document.querySelector('.target'),
                //anchor: document.querySelector('.writing-div'),
                //anchor: document.querySelector('.fakey'),
                //anchor: document.querySelector('#message-div' && '#message-div-left'),
                //anchor: document.querySelector('#message-div-left'),
                props: {
                    text: $message
                }
            })
            messageIsMine.set(0);
        }

        const scrollToBottom = async (node) => {
            node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
        }; 

        afterUpdate(() => {
            scrollToBottom(element);
        });

        onMount(async () => {
            //let avatar = casualAvatar();
            //avatarSvg=avatar.toString();
        });

        let displayAvatar = false;

        $: if($otherAvatar != ''){
            displayAvatar = true
        }
</script>

<div class="chat-div">
    <div class="effective-chat">

        {#if displayAvatar}
            <span>{@html avatarSvg}{@html $otherAvatar}</span>
        {:else}
            <span>{@html avatarSvg}</span>
        {/if}


        <!--<span>{@html avatarSvg}</span>-->

        <div class="invisible">
            <div class="invisible overflow target" bind:this={element}>
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
        //justify-content: flex-end;
    }
}


.effective-chat{
    span{
        min-height: 1px;
        position: absolute;
        max-width: 90%;
        width: calc(90% - 2px);
        background-color: inherit;
        text-align: center;
        border-radius: 8px;
    }
}

span :global(svg){
    --misura: 6.66vh;
    width: var(--misura);
    height: var(--misura);
}
</style>
