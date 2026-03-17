<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import Portal from 'svelte-portal';
	import IconLink from './buttons/IconLink.svelte';

	export let selectedMember;
	let overlay;

	const dispatch = createEventDispatcher();
	function closeModal() {
		dispatch('close');
		if (window.__smoother) window.__smoother.paused(false);
	}

	onMount(() => {
		const y = window.__smoother ? window.__smoother.scrollTop() : window.scrollY;
		overlay.style.top = `${y}px`;
		if (window.__smoother) window.__smoother.paused(true);
	});

	onDestroy(() => {
		if (window.__smoother) window.__smoother.paused(false);
	});

	let copied = false;
	async function copyToClipboard() {
		const contact = [selectedMember.tel, selectedMember.email].filter(Boolean).join(', ');
		const text = `${selectedMember.name}, ${selectedMember.position}${contact ? ` (${contact})` : ''}`;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<Portal>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div bind:this={overlay} class="overlay" on:click={closeModal}>
		<div class="modal" on:click|stopPropagation>
			<button on:click={closeModal} class="close-btn">
				<img src="/icons/close.svg" alt="close icon" />
			</button>
			<div class="img-wrapper">
				<img src="family/{selectedMember.img}" alt="member headshot full" />
			</div>
			<div class="contact">
				<h2>{selectedMember.name}</h2>
				<p>{selectedMember.position}</p>
				<p>{selectedMember.desc}</p>
				<div class="spacer"></div>
				{#if selectedMember.tel}
					<IconLink href={selectedMember.tel} svgPath="icons/phone.svg">
						{selectedMember.tel}
					</IconLink>
				{/if}
				{#if selectedMember.email}
					<IconLink href={selectedMember.email} svgPath="icons/email.svg">
						{selectedMember.email}
					</IconLink>
				{/if}
				<div class="spacer"></div>
				<IconLink svgPath="icons/copy.svg" on:click={copyToClipboard}>
					{copied ? 'Zkopírováno!' : 'Kopírovat vizitku'}
				</IconLink>
			</div>
		</div>
	</div>
</Portal>

<style>
	.overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);

		display: flex;
		justify-content: center;
		align-items: center;

		z-index: 9999;

		height: 100vh;

		overflow: hidden;
	}

	.modal {
		position: relative;
		width: min(90vw, 960px);
		border-radius: 12px;
		overflow: hidden;

		background-color: var(--black);

		display: flex;
		flex-direction: row;
	}

	.modal .img-wrapper {
		height: 500px;
		width: auto;
	}

	.modal .img-wrapper img {
		height: 100%;
		width: auto;
	}

	.modal .contact {
		display: flex;
		flex-direction: column;

		padding: 2rem;
	}

	.close-btn {
		all: unset;
		cursor: pointer;

		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 1));
		transition: all 0.25s ease;

		position: absolute;
		top: 12px;
		right: 12px;

		width: 50px;
		height: 50px;
	}

	.close-btn:hover {
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.1))
			drop-shadow(0 0 12px rgba(255, 255, 255, 0.05));
		transform: scale(1.2) rotate(2deg);
	}

	.spacer {
		flex: 1;
	}
</style>
