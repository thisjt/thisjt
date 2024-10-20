<script>
	import PageHeader from '$lib/PageHeader.svelte';
	import PageTitle from '$lib/PageTitle.svelte';
	import { loadArticles } from '$lib/postfetcher.js';
	import { onMount } from 'svelte';
	import SvelteSEO from 'svelte-seo';

	export let data;

	let { tags, posts, error } = data;

	onMount(async () => {
		/**@type {Awaited<ReturnType<import('$lib/postfetcher.js').loadArticles>>}*/
		let clientData;

		if (!data.clientFetch) {
			sessionStorage.setItem('thisjtme_blog', JSON.stringify({ tags, error, posts, time: new Date().getTime() }));
			return;
		}
		try {
			clientData = JSON.parse(sessionStorage.getItem('thisjtme_blog') || '');
			if (!clientData) throw Error('no sessionStorage');
			if (!Array.isArray(clientData.tags) || !Array.isArray(clientData.posts) || clientData.error !== false) throw Error('bad data form');
			if (clientData.time < new Date().getTime() - 1000 * 60 * 30) throw Error('cache refresh');
		} catch {
			clientData = await loadArticles('/blog');
			sessionStorage.setItem('thisjtme_blog', JSON.stringify(clientData));
		}

		tags = clientData.tags;
		posts = clientData.posts;
		error = clientData.error;
	});
</script>

<SvelteSEO
	title="blog - thisjt.me personal website"
	description={"In this blog, I share my thoughts, ideas, and insights on various programming topics. It's a space where" +
		'I explore different aspects of coding, from practical tips to personal reflections, offering a glimpse into my journey' +
		'and the things that inspire me in the tech world.'}
	canonical="https://thisjt.me/blog"
	keywords="thisjt, thisjtme, personal website, personal, github, software developer"
	openGraph={{
		title: 'blog - thisjt.me personal website',
		description:
			"In this blog, I share my thoughts, ideas, and insights on various programming topics. It's a space where" +
			'I explore different aspects of coding, from practical tips to personal reflections, offering a glimpse into my journey' +
			'and the things that inspire me in the tech world.',
		url: 'https://thisjt.me/blog',
		type: 'website',
		images: [
			{
				url: 'https://thisjt.me/social2.png',
				width: 762,
				height: 400,
				alt: "thisjt's social banner with address and social media links",
			},
		],
	}} />
<PageTitle text="blog" />
<div class="w-full px-4">
	<PageHeader
		heading="Blog"
		description="In this blog, I share my thoughts, ideas, and insights on various programming topics. It's a space where I explore different aspects of coding, from practical tips to
			personal reflections, offering a glimpse into my journey and the things that inspire me in the tech world." />
	{#if error}
		<div class="mb-4 mt-6 text-center">
			<h1 class="text-4xl font-bold text-white">Ooops.</h1>
		</div>
		<p class="mb-4">We are unable to show blog articles at this time. Please try again in a few minutes.</p>
	{:else}
		<div class="mb-4 flex gap-3">
			{#each tags as tag}
				<div class="cursor-pointer rounded-lg bg-secondary px-3 py-1.5 transition hover:bg-primary">{tag}</div>
			{/each}
		</div>
		<div class="mb-4 flex flex-wrap gap-3">
			{#each posts as post}
				<a href="/blog/{post.slug}" class="| group flex grow flex-col rounded-lg bg-base-100 pb-3 transition hover:bg-secondary sm:w-1/3">
					<div class="p-2">
						<img class="rounded-md" src={post.cover} alt="" />
					</div>
					<div class="m-2 flex flex-col gap-2">
						<div class="text-xl font-bold text-white">{post.title}</div>
						<div class="text-sm text-gray-500">
							{new Date(post.published).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
							<span class="text-gray-600"> ({new Date(post.updated).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}) </span>
						</div>
						<div class="line-clamp-2 text-xs text-gray-400 group-first:line-clamp-3">{post.content}</div>
					</div>
				</a>
			{:else}
				<div class="group | h-64 animate-pulse sm:w-1/3 grow flex flex-col bg-base-100 rounded-lg transition pb-3 mt-9"></div>
				<div class="group | h-64 animate-pulse sm:w-1/3 grow flex flex-col bg-base-100 rounded-lg transition pb-3 mt-9"></div>
			{/each}
			{#if posts?.length || 1 % 2 === 0}
				<div class="grow sm:w-1/3"></div>
			{/if}
		</div>
	{/if}
</div>
