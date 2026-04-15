<script>
	export let id;
</script>

<!-- TODO narvat na všechny sekce -->
<section {id}>
	<slot></slot>
</section>

<style>
	section {
		position: relative;

		min-height: 100vh;
		padding: 0 var(--general-px);

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/* Bigger than 1920px (ultrawide / 2K / 4K) */
	@media (min-width: 1921px) {
		section {
			min-height: 100%;
			width: 60%;
			margin: 10rem auto;
		}
	}
</style>
