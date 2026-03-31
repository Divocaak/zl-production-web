import { saveJson } from '$lib/admin/scripts/saveJson.js';
import { processImage } from '$lib/admin/scripts/saveImages.js';

export async function POST({ request }) {
    const data = await request.json();

    let errs = [];
    for (const item of data) {
        item.id = item.id.toLowerCase()
            /* .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[\u0300-\u036f]/g, "")    // Remove diacritic marks
            .replace(/[\d\W_]+/g, "-")          // Remove numbers and special characters, replace with "-"
            .replace(/^-+|-+$/g, "");	 */		// Trim leading/trailing dashes

        const path = `reference/${item.id}`;
        item.image = (await processImage(item.image, path, errs)) ?? item.image;
        item.video = (await processImage(item.video, path, errs)) ?? item.video;
    }

    // error handling outside of for loop
    // code does not crash under first error but continues with the rest
    const jsonResponse = await saveJson(data, './dynamic/jsons/reference.json');
    let toRet = errs.find((e) => e && e.status === 500);
    if (!toRet) toRet = jsonResponse;
    return new Response(JSON.stringify(toRet));
}