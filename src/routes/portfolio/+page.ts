import { hydrated } from '$lib/firstload';
import { loadArticles } from '$lib/postfetcher';

export async function load({ fetch: loadfetch }) {
	if (hydrated) return { error: false, posts: [], tags: [], clientFetch: true };

	return await loadArticles('/posts', loadfetch);
}
