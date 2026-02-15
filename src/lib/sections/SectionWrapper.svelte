<script>
	export let id;
</script>

<section {id}>
	<slot></slot>
</section>

<style>
	section {
		position: relative;
		
		min-height: 100vh;
		padding: 0 8rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		section {
			padding: 0 1rem;
		}
	}
	
	/* Bigger than 1920px (ultrawide / 2K / 4K) */
	@media (min-width: 1921px) {
		section {
			padding: 0 15%;
		}
	}
</style>
