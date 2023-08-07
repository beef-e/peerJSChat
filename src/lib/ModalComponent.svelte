<script>
    import { closeModal } from 'svelte-modals'

    export let isOpen
    export let title = "Alert"
    export let message = "This is an alert"
</script>

{#if isOpen}
<div role="dialog" class="modal">
    <div class="contents">
        <h2>{title}</h2>
        <p>{message}</p>
        <div class="actions">
            <button on:click="{closeModal}">OK</button>
        </div>
    </div>
</div>
{/if}

<style lang="scss">
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

      /* allow click-through to backdrop */
        pointer-events: auto;
    }

    .contents {
        min-width: 240px;
        border-radius: 8px;
        padding: 16px;
        background:#242424;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }

    h2 {
        text-align: center;
        color: rgba(255, 255, 255, 0.87);
        font-size: 24px;
    }

    p {
        text-align: center;
        color: rgba(255, 255, 255, 0.87);
        margin-top: 16px;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: center;

        button{
            background: #313131;
            outline: none;
            border-radius: 6px;
            border: 0;
            /*border: 0.05px solid rgba(255, 255, 255, 0.87);*/
            color: rgba(255, 255, 255, 0.87);
            padding: 1%;
            min-height: 30px;
            min-width: 50px;
        }
    }
</style>