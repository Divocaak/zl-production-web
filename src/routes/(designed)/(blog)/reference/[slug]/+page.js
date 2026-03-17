import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {

    const res = await fetch('/blog-references.json');
    if (!res.ok) throw error(500, 'Failed to load references data');
    const references = await res.json();

    const item = references.items[params.slug];
    if (!item) throw error(404, 'Reference not found');
    return { reference: item };
};