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
  import { peer } from '../src/utils/utils'
  import { Circle } from 'svelte-loading-spinners'

  const wait = () => new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 1000) + 500))

  async function awaitPeer() {
    try {
      await wait()
      return await peer.id
    } catch (error) {
      console.log(error)
    }
  }

</script>

<main>

  {#await awaitPeer()}
  <div class="loading">
    <Circle color="#ffffde"/>
  </div>
  {:then data}   
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

  {/await}


</main>

<style>

</style>
