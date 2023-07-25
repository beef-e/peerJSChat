<script lang="ts">
    import WritingBar from "./WritingBar.svelte";
</script>

<div class="chat-div">
<div>

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
