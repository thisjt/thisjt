import { loadArticles } from '$lib/postfetcher';

export async function load({ fetch: loadfetch }) {
	return {
		streamed: {
			posts: loadArticles('/posts', loadfetch),
		},
	};
}
