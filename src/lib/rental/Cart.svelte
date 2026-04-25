<script>
	import { cart, cartTotalPrice, cartItemsCount } from '$lib/stores/cart';
</script>

{#if $cart.length > 0}
	<table>
		<thead>
			<tr>
				<th>Název</th>
				<th>Počet</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each $cart as item}
				<tr>
					<td>{item.label}</td>
					<td>
						<button on:click={() => cart.decrement(item._key)} aria-labelledby="cart decrement">
							<img src="/icons/minus.svg" alt="cart minus icon" />
						</button>
						<span>{item.quantity}</span>
						<button on:click={() => cart.add(item)} aria-labelledby="cart dincrement">
							<img src="/icons/plus.svg" alt="cart plus icon" />
						</button>
					</td>
					<td>
						<button on:click={() => cart.remove(item._key)} aria-labelledby="cart clear">
							<img src="/icons/cart-delete.svg" alt="cart clear icon" />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<p><b>Celkem položek:</b> {$cartItemsCount}</p>
	<div class="actions">
		<button on:click={cart.clear} aria-labelledby="cart clear">
			<img src="/icons/cart-delete.svg" alt="cart clear icon" />
		</button>
		<button class="checkout">Odeslat poptávku</button>
	</div>
{/if}

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;
	}

	th,
	td {
		padding: 0.5rem;
		border-bottom: 1px solid #ddd;
		text-align: left;
	}

	button {
		all: unset;
		cursor: pointer;

		padding: 0.25rem 0.5rem;
		margin: 0 0.25rem;
	}

	button img {
		width: 20px;
		height: auto;
		aspect-ratio: 1/1;
	}

	.actions {
		margin-top: 1rem;
		display: flex;
		gap: 1rem;
	}
</style>
