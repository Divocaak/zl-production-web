import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'cart';

// --- helpers ---
function loadCart() {
    if (!browser) return [];

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Failed to load cart:', e);
        return [];
    }
}

function saveCart(cart) {
    if (!browser) return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error('Failed to save cart:', e);
    }
}

// --- main store ---
function createCart() {
    const { subscribe, set, update } = writable(loadCart());

    return {
        subscribe,

        // replace entire cart
        set(items) {
            saveCart(items);
            set(items);
        },

        add(item) {
            update(items => {
                const existing = items.find(i => i.id === item.id);

                let updated;
                if (existing) {
                    updated = items.map(i =>
                        i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                } else {
                    updated = [...items, { ...item, quantity: 1 }];
                }

                saveCart(updated);
                return updated;
            });
        },

        remove(id) {
            update(items => {
                const updated = items.filter(i => i.id !== id);
                saveCart(updated);
                return updated;
            });
        },

        increment(id) {
            update(items => {
                const updated = items.map(i =>
                    i.id === id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
                saveCart(updated);
                return updated;
            });
        },

        decrement(id) {
            update(items => {
                const updated = items
                    .map(i =>
                        i.id === id
                            ? { ...i, quantity: i.quantity - 1 }
                            : i
                    )
                    .filter(i => i.quantity > 0);

                saveCart(updated);
                return updated;
            });
        },

        clear() {
            saveCart([]);
            set([]);
        }
    };
}

export const cart = createCart();
export const cartItemsCount = derived(cart, $cart => $cart.reduce((total, item) => total + item.quantity, 0));
export const cartTotalPrice = derived(cart, $cart => $cart.reduce((total, item) => total + item.price * item.quantity, 0));
export const cartUniqueItems = derived(cart, $cart => $cart.length);