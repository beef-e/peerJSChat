<script lang="ts">
	// @ts-nocheck
	import { afterUpdate } from 'svelte';

	import WritingBar from './WritingBar.svelte';
	import MessageComponent from './MessageComponent.svelte';
	import MessageComponentLeft from './MessageComponentLeft.svelte';

	import { message, avatarSvg, otherAvatar, messageIsMine } from '../utils/utils';

	let element: HTMLElement;

	$: if ($messageIsMine === 1) {
		const element = new MessageComponent({
			target: document.querySelector('.target'),
			props: {
				text: $message,
			},
		});
		messageIsMine.set(0);
	} else if ($messageIsMine === 2) {
		const element = new MessageComponentLeft({
			target: document.querySelector('.target'),
			props: {
				text: $message,
			},
		});
		messageIsMine.set(0);
	}

	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	afterUpdate(() => {
		scrollToBottom(element);
	});

	let displayAvatar = false;

	$: if ($otherAvatar != '') {
		displayAvatar = true;
	}
</script>

<div class="chat-div">
	<div class="effective-chat">
		{#if displayAvatar}
			<span>{@html $otherAvatar}{@html avatarSvg}</span>
		{:else}
			<span>{@html avatarSvg}</span>
		{/if}

		<div class="invisible">
			<div
				class="invisible overflow target"
				bind:this={element}
			>
				<slot />
			</div>
		</div>

		<WritingBar />
		<!--Component della barra di scrittura-->
	</div>
</div>

<style lang="scss">
	.chat-div {
		div {
			display: flex;
			flex-direction: column;
		}
	}

	.effective-chat {
		span {
			min-height: 1px;
			position: absolute;
			max-width: 90%;
			width: calc(90% - 2px);
			background-color: inherit;
			text-align: center;
			border-radius: 8px;
		}
	}

	span :global(svg) {
		--misura: 6.66vh;
		width: var(--misura);
		height: var(--misura);
	}
</style>
