import { hydrated } from '$lib/firstload';
import { loadArticle } from '$lib/postfetcher';

export async function load({ fetch: loadfetch, params }) {
	if (hydrated) return { error: false, post: null, slug: params.slug, clientFetch: true };

	return loadArticle(params.slug, loadfetch);
}
