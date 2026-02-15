<script>
	export let item;
</script>

<div class="wrapper">
	<img src={item.image} alt="reference" />
	<h3>{item.label}</h3>
	<p>{item.desc}</p>
	<p class="year">{item.year}</p>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 4rem 2rem;

		background: rgba(255, 255, 255, 0.02);
		padding: 2rem 1.5rem;
		margin: 1rem;
		border-radius: 6px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.wrapper:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}

	.wrapper img {
		width: 40%;
	}

	.wrapper h3 {
		font-size: 1.2rem;
		text-transform: uppercase;
		color: var(--zl-red);
	}

	.wrapper p {
		text-align: center;
	}

	.year {
		font-weight: bolder;
		color: var(--zl-red);
	}
</style>
