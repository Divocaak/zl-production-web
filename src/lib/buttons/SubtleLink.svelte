<script>
	export let href;
	export let target = '_self';
</script>

<a {href} {target} rel="noopener noreferrer" class="subtle-link">
	<slot />
</a>

<style>
	.subtle-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;

		color: var(--white);
		text-decoration: none;
		font-weight: 500;
		letter-spacing: 0.02em;

		opacity: 0.9;
		transition: all 0.2s ease;

        cursor: pointer;
	}

	.subtle-link:hover {
		opacity: 1;
		transform: translateY(-1px);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.subtle-link:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 3px;
	}
</style>
