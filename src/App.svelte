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
  import { Modals, closeModal } from 'svelte-modals'

  function createNewComponent() {
    const element = new MessageComponent({
      target: document.querySelector('#effective-chat'),
    })
  }

</script>

<main>
  <Header></Header>

  <Modals>
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
    />
  </Modals>

  <Chat>

  </Chat>
</main>

<style>

</style>
