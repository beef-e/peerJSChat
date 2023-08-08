<script lang="ts">
  // @ts-nocheck
  import Header from './lib/Header.svelte'
  import Chat from './lib/Chat.svelte'
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
