<div class="wrapper">
	<div class="content"><slot name="left" /></div>
	<div class="content"><slot name="right" /></div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2rem;
	}

	.content {
		position: relative;
		width: 50%;
	}

	/* NOTE media bank */
	/* iPad Pro and smaller (≤ 1366px) */
	@media (max-width: 1366px) {
		.wrapper {
			flex-direction: column;
		}

		.content {
			width: 100%;
		}
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
	}

	/* iPhone 15 and smaller (≤ 430px) */
	@media (max-width: 430px) {
	}

	/* Bigger than 1920px (ultrawide / 2K / 4K) */
	@media (min-width: 1921px) {
	}
</style>
