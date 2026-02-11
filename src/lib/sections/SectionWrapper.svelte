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
</style>
