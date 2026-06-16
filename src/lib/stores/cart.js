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
                const key = getItemKey(item);
                const existing = items.find(i => i._key === key);

                let updated;
                if (existing) {
                    updated = items.map(i =>
                        i._key === key
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                } else {
                    updated = [...items, { ...item, _key: key, quantity: 1 }];
                }

                saveCart(updated);
                return updated;
            });
        },

        remove(key) {
            update(items => {
                const updated = items.filter(i => i._key !== key);
                saveCart(updated);
                return updated;
            });
        },

        decrement(key) {
            update(items => {
                const updated = items
                    .map(i =>
                        i._key === key
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

function getItemKey(item) {
    if (!item?.label) return '';
    return item.label
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');
}

export const cart = createCart();
export const cartItemsCount = derived(cart, $cart => $cart.reduce((total, item) => total + item.quantity, 0));
export const cartTotalPrice = derived(cart, $cart => $cart.reduce((total, item) => total + item.price * item.quantity, 0));
export const cartUniqueItems = derived(cart, $cart => $cart.length);