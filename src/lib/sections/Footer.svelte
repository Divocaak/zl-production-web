<script>
	import IconLink from '$lib/buttons/IconLink.svelte';
	import SubtleLink from '$lib/buttons/SubtleLink.svelte';
</script>

<div class="powered-by">
	<h2 style="text-align: center;">Powered by</h2>
	<div class="logos-grid">
		<img src="/logos/equipment/partners/adamson.svg" class="white" alt="partners logo" />
		<img src="/logos/equipment/partners/digico.svg" alt="partners logo" />
		<img src="/logos/equipment/partners/shure.svg" class="white" alt="partners logo" />
		<img src="/logos/equipment/partners/yamaha.svg" class="white" alt="partners logo" />
		<img src="/logos/equipment/partners/chamsys.svg" class="white" alt="partners logo" />
		<img src="/logos/equipment/partners/ma-white.svg" alt="partners logo" />
		<img src="/logos/equipment/partners/luminex-white.svg" alt="partners logo" />
		<img src="/logos/equipment/partners/robe-white.svg" alt="partners logo" />
		<img src="/logos/equipment/partners/novastar.svg" class="white" alt="partners logo" />
		<img src="/logos/equipment/partners/blackmagic.svg" alt="partners logo" />
		<img src="/logos/equipment/partners/nivtec.svg" class="white" alt="partners logo" />
		<img src="/logos/equipment/partners/taf.svg" alt="partners logo" />
	</div>
</div>
<footer id="contact">
	<div class="footer-content">
		<div class="img-wrapper">
			<img src="/logos/big-zl-dark.svg" alt="big zl logo" />
			<img src="/logos/rataj-dark.svg" alt="josef rataj copyright" />
		</div>
		<div class="contacts-group">
			<div class="contact-wrapper">
				<div class="head">
					<h2>Kontakt</h2>
					<p>Fakturační údaje</p>
				</div>
				<IconLink href="mailto:office@zlproduction.cz" svgPath="/icons/email.svg">
					office@zlproduction.cz
				</IconLink>
				<IconLink href="tel:+420728038723" svgPath="/icons/phone.svg">
					+420&nbsp728&nbsp038&nbsp723
				</IconLink>
				<p>
					ZL Production s.r.o.<br />
					Brojova&nbsp;16,<br />
					326&nbsp;00&nbsp;Plzeň<br />
					<br />
					IČO:&nbsp;26398443<br />
					DIČ:&nbsp;CZ26398443<br />
					BÚ:&nbsp;RB,&nbsp;2172635001/5500<br />
					Zapsáno: Krajský&nbsp;soud v&nbsp;Plzni,<br />
					odd.&nbsp;C, složka&nbsp;17733
				</p>
			</div>
			<div class="contact-wrapper">
				<div class="head">
					<h2>ZL Base</h2>
					<p>Sklad techniky, studio, produkční zázemí</p>
				</div>
				<IconLink href="mailto:studio@zlproduction.cz" svgPath="/icons/email.svg">
					studio@zlproduction.cz
				</IconLink>
				<IconLink href="tel:+420605215333" svgPath="/icons/phone.svg">
					+420&nbsp605&nbsp215&nbsp333
				</IconLink>
				<p>
					ZL&nbsp;Backstage &&nbsp;ZL&nbsp;Studio<br />
					Spravedlnost&nbsp;č.p.&nbsp;920<br />
					503&nbsp;51&nbsp;Chlumec&nbsp;nad&nbsp;Cidlinou
				</p>
			</div>
		</div>
		<div class="nav-wrapper">
			<SubtleLink href="/">Úvod</SubtleLink>
			<SubtleLink href="/reference">Reference</SubtleLink>
			<SubtleLink href="/studio">Studio</SubtleLink>
			<SubtleLink href="/technika">Technika</SubtleLink>
			<SubtleLink href="https://www.zlbooking.cz/" target="_blank">Booking</SubtleLink>
			<SubtleLink href="/zlfamily">ZL Family</SubtleLink>
			<SubtleLink href="/kariera">Kariéra</SubtleLink>
		</div>
	</div>
	<p class="signature">
		Website designed, coded and maintained by
		<a href="https://divokyvojtech.cz" target="_blank">Vojtěch Divoký</a>
	</p>
</footer>

<style>
	.powered-by {
		position: relative;
		padding: 0 var(--general-px);
	}

	.powered-by .logos-grid {
		display: grid;
		grid-template-columns: repeat(6, auto);
		grid-template-rows: repeat(2, auto);
		gap: 2rem;

		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;
	}

	.powered-by .logos-grid img {
		width: 100%;
		max-width: 150px;
		max-height: 75px;

		height: auto;
		object-fit: contain;
		display: block;
	}

	footer {
		display: flex;
		flex-direction: column;
	}

	.footer-content {
		min-height: 100vh;
		width: 100%;

		background-image: url('/monkey-touch.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;

		background-image:
			linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url('/monkey-touch.svg');

		display: grid;
		grid-template-columns: 1fr 2fr 1fr;

		justify-items: center;
		justify-content: space-evenly;

		align-items: center;
	}

	.img-wrapper img {
		width: 100%;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
	}

	.img-wrapper img:last-child {
		width: 35%;
		margin: 0 auto;
	}

	.contacts-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		/* gap: 3rem; */

		justify-content: space-between;
		align-items: start;
	}

	.img-wrapper,
	.nav-wrapper,
	.contact-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.head h2,
	.head p {
		margin: 0;
		margin-top: 0;
	}

	.head p {
		margin-bottom: 1rem;
		height: 2em;
	}

	.signature {
		bottom: 0;
		width: calc(100% - 2rem);
		padding: 0 1rem;
		margin: 0;

		text-align: end;
		font-size: var(--text-12);
		opacity: 0.6;

		background-color: black;

		color: var(--white);
	}

	.signature a {
		color: var(--white);
		font-size: var(--text-12);
	}

	.logos-grid img.white {
		filter: brightness(0) invert(1);
	}

	/* iPad and smaller (≤ 1024px) */
	@media (max-width: 1024px) {
		footer {
			margin-top: 4rem;
		}

		.footer-content {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				'logo nav'
				'contactsGroup contactsGroup';
			column-gap: 2rem;
			row-gap: 3rem;
			align-items: start;
			align-content: center;

			min-height: auto;
		}

		.img-wrapper {
			grid-area: logo;

			margin: 0 auto;
		}

		.nav-wrapper {
			grid-area: nav;
			width: fit-content;
			margin: 0 auto;
		}

		.contacts-group {
			grid-area: contactsGroup;
		}
	}

	/* iPhone and smaller (≤ 430px) */
	@media (max-width: 430px) {
		.footer-content {
			grid-template-columns: 1fr;
			grid-template-areas:
				'logo'
				'nav'
				'contactsGroup';
			row-gap: 2rem;
			justify-items: center;
		}

		.img-wrapper,
		.nav-wrapper,
		.contact-wrapper {
			width: calc(100% - 2 * var(--general-px));
			padding: 0 var(--general-px);
		}

		.contacts-group {
			display: flex;
			flex-direction: column;
		}

		.nav-wrapper {
			gap: 0.75rem;
			text-align: center;
			align-items: center;
		}

		.img-wrapper {
			text-align: center;
			align-items: center;
		}

		.img-wrapper img {
			max-width: 220px;
		}

		.powered-by .logos-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(5, 1fr);
			gap: 2rem;
		}
	}
</style>
