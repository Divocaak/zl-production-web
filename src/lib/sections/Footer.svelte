<script>
	import IconLink from '$lib/buttons/IconLink.svelte';
	import SubtleLink from '$lib/buttons/SubtleLink.svelte';
</script>

<footer id="contact">
	<div class="footer-content">
		<div class="img-wrapper">
			<img src="/logos/big-zl-dark.svg" alt="big zl logo" />
			<img src="/logos/rataj-dark.svg" alt="josef rataj copyright" />
		</div>
		<div class="contact-wrapper">
			<h2>Kontakt</h2>
			<IconLink href="mailto:info@zlproduction.cz" svgPath="icons/email.svg">
				info@zlproduction.cz
			</IconLink>
			<IconLink href="tel:+420111222333" svgPath="icons/phone.svg">
				+420&nbsp111&nbsp222&nbsp333
			</IconLink>
			<p>
				ZL Production s.r.o.<br />
				IČO 26398443 <br /><br />
				Brojova&nbsp;2113/16<br />
				Východní&nbsp;Předměstí<br />
				32600&nbsp;Plzeň
			</p>
		</div>
		<div class="nav-wrapper">
			<!-- TODO fix links -->
			<SubtleLink href="/#about">O nás</SubtleLink>
			<SubtleLink href="/#reference">Reference</SubtleLink>
			<SubtleLink href="/#booking">Booking</SubtleLink>
			<SubtleLink href="/#studio">Studio</SubtleLink>
			<SubtleLink href="/#family">Family</SubtleLink>
			<SubtleLink href="/#equipment">Technika</SubtleLink>
		</div>
	</div>
	<p class="signature">
		Website designed, coded and maintained by
		<a href="https://divokyvojtech.cz" target="_blank">Vojtěch Divoký</a>
	</p>
</footer>

<style>
	footer {
		min-height: 100vh;

		background-image: url('/monkey-touch.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;

		background-image:
			linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url('/monkey-touch.svg');

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.footer-content {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.img-wrapper img {
		width: 100%;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
	}

	.img-wrapper img:last-child {
		width: 35%;
		margin: 0 auto;
	}

	.img-wrapper,
	.nav-wrapper,
	.contact-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-wrapper h2 {
		margin: 0;
	}

	.signature {
		position: absolute;
		bottom: 0;
		width: calc(100% - 2rem);
		padding: 0 1rem;

		text-align: end;
		font-size: 0.5rem;
		opacity: 0.6;

		color: var(--white);
	}

	.signature a {
		color: var(--white);
	}
</style>
