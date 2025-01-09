const endpoint = 'https://blog.thisjt.me';

export function contentStrip(content: string) {
	content = content.replace(/(<([^>]+)>)/gi, '').slice(0, 400);
	content = content.replaceAll('&nbsp;', '');
	return content;
}

export async function loadArticles(url: string, customFetch?: (url: string) => Promise<Response>) {
	try {
		const allPosts = customFetch ? await customFetch(`${endpoint}${url}`) : await fetch(`${endpoint}${url}`);

		const posts: import('$lib/types').portfolioPost[] = [];
		const tags: { [s: string]: string } = {};

		const allPostsDecoded: import('$lib/types').bloggerAPIresult = await allPosts.json();
		allPostsDecoded.items?.forEach((post) => {
			const url = new URL(post.url);
			const slug = url.pathname.replaceAll('.html', '');
			const explodedSlug = slug.split('/');
			const constructedSlug = explodedSlug.pop();

			const uid = (parseInt(explodedSlug.join('')) - 200000).toString(16);
			post.labels?.forEach((label) => {
				tags[label] = '';
			});

			posts.push({
				slug: `${uid}-${constructedSlug}`,
				published: new Date(post.published).getTime(),
				updated: new Date(post.updated).getTime(),
				title: post.title,
				cover: post.images[0].url,
				tags: post.labels,
				content: contentStrip(post.content),
			});
		});

		return { error: false, posts, tags: Object.keys(tags), time: new Date().getTime() };
	} catch (e) {
		console.error(e);
		return { error: true, posts: [], tags: [], time: new Date().getTime() };
	}
}

export async function loadArticle(slug: string, customFetch?: (url: string) => Promise<Response>) {
	try {
		const allPosts = customFetch ? await customFetch(`${endpoint}/post?slug=${slug}`) : await fetch(`${endpoint}/post?slug=${slug}`);

		const apiPost: import('$lib/types').bloggerAPIpostresult = await allPosts.json();
		if (apiPost.error) return { error: true, post: null, time: new Date().getTime() };

		const post = {
			slug,
			published: new Date(apiPost.published).getTime(),
			updated: new Date(apiPost.updated).getTime(),
			title: apiPost.title,
			content: apiPost.content,
			tags: apiPost.labels,
		};

		return { error: false, post, time: new Date().getTime() };
	} catch {
		return { error: true, post: null, time: new Date().getTime() };
	}
}
