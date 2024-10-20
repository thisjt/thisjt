<script>
	import PageHeader from '$lib/PageHeader.svelte';
	import PageTitle from '$lib/PageTitle.svelte';
	import { loadArticles } from '$lib/postfetcher';
	import { onMount } from 'svelte';
	import SvelteSEO from 'svelte-seo';

	export let data;

	let { tags, posts, error } = data;

	onMount(async () => {
		/**@type {{tags:string[], error:boolean, posts:import('$lib/types').portfolioPost[], time:number}}*/
		let clientData;

		if (!data.clientFetch) {
			sessionStorage.setItem('thisjtme_portfolio', JSON.stringify({ tags, error, posts, time: new Date().getTime() }));
			return;
		}
		try {
			clientData = JSON.parse(sessionStorage.getItem('thisjtme_portfolio') || '');
			if (!clientData) throw Error('no sessionStorage');
			if (!Array.isArray(clientData.tags) || !Array.isArray(clientData.posts) || clientData.error !== false) throw Error('bad data form');
			if (clientData.time < new Date().getTime() - 1000 * 60 * 30) throw Error('cache refresh');
		} catch (e) {
			console.log(e);
			clientData = await loadArticles('/posts');
			sessionStorage.setItem('thisjtme_portfolio', JSON.stringify(clientData));
		}

		tags = clientData.tags;
		posts = clientData.posts;
		error = clientData.error;
	});
</script>

<SvelteSEO
	title="portfolio - thisjt.me personal website"
	description={'In this page you will see my work as a portfolio that highlights my skills, experience, and expertise. ' +
		'It includes a variety of projects across different disciplines, demonstrating my ability to deliver quality results.'}
	canonical="https://thisjt.me/portfolio"
	keywords="thisjt, thisjtme, personal website, personal, github, software developer"
	openGraph={{
		title: 'portfolio - thisjt.me personal website',
		description:
			'In this page you will see my work as a portfolio that highlights my skills, experience, and expertise. ' +
			'It includes a variety of projects across different disciplines, demonstrating my ability to deliver quality results.',
		url: 'https://thisjt.me/portfolio',
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
<PageTitle text="portfolio" />
<div class="w-full px-4">
	<PageHeader
		heading="Portfolio"
		description={'In this page you will see my work as a portfolio that highlights my skills, experience, and expertise. It includes ' +
			'a variety of projects across different disciplines, demonstrating my ability to deliver quality results.'} />
	{#if error}
		<div class="mb-4 mt-6 text-center">
			<h1 class="text-4xl font-bold text-white">Ooops.</h1>
		</div>
		<p class="mb-4">We are unable to show the portfolio at this time. Please try again in a few minutes.</p>
	{:else}
		<div class="mb-4 flex gap-3">
			{#each tags as tag}
				<div class="cursor-pointer rounded-lg bg-secondary px-3 py-1.5 transition hover:bg-primary">{tag}</div>
			{/each}
		</div>
		<div class="mb-4 flex flex-wrap gap-3">
			{#each posts as post}
				<a href="/portfolio/{post.slug}" class="| group flex grow flex-col rounded-lg bg-base-100 pb-3 transition first:w-full hover:bg-secondary sm:w-1/3">
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
				<div class="group | h-64 animate-pulse first:w-full sm:w-1/3 grow flex flex-col bg-base-100 rounded-lg transition pb-3 mt-9"></div>
				<div class="group | h-64 animate-pulse first:w-full sm:w-1/3 grow flex flex-col bg-base-100 rounded-lg transition pb-3"></div>
				<div class="group | h-64 animate-pulse first:w-full sm:w-1/3 grow flex flex-col bg-base-100 rounded-lg transition pb-3"></div>
			{/each}
			{#if posts?.length || 1 % 2 === 0}
				<div class="grow sm:w-1/3"></div>
			{/if}
		</div>
	{/if}
</div>
