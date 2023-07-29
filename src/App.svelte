<script lang="ts">
  // @ts-nocheck
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Header from './lib/Header.svelte'
  import Chat from './lib/Chat.svelte'
  import MessageComponent from './lib/MessageComponent.svelte'
  import MessageComponentLeft from './lib/MessageComponentLeft.svelte'
  import WritingBar from './lib/WritingBar.svelte'
</script>

<main>
  <Header></Header>

  <Chat>
    <MessageComponent></MessageComponent>
    <MessageComponentLeft></MessageComponentLeft>
    <MessageComponent></MessageComponent>

    <WritingBar></WritingBar>
  </Chat>
</main>

<style>

</style>
