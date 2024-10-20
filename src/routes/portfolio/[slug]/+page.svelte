<script>
	import PageHeader from '$lib/PageHeader.svelte';
	import PageTitle from '$lib/PageTitle.svelte';
	import SvelteSEO from 'svelte-seo';
	import { onMount } from 'svelte';
	import { contentStrip, loadArticle } from '$lib/postfetcher.js';

	export let data;
	/**@type {HTMLDivElement}*/
	let portfolioContent;
	/**@type {HTMLDivElement}*/
	let imageViewer;
	/**@type {HTMLDivElement}*/
	let imageCaption;
	/**@type {HTMLAnchorElement}*/
	let imageHolder;

	let { post, error } = data;

	onMount(() => {
		portfolioContent.addEventListener('click', blogContentImageHandler);
		imageViewer.addEventListener('click', imageViewerHandler);

		if (data.clientFetch) {
			/**@type {Awaited<ReturnType<import('$lib/postfetcher.js').loadArticle>>}*/
			let clientData;
			try {
				clientData = JSON.parse(sessionStorage.getItem(`thisjtme_blog_${data.slug}`) || '');
				if (!clientData) throw Error('no sessionStorage');
				if (clientData.time < new Date().getTime() - 1000 * 60 * 30) throw Error('cache refresh');
				post = clientData.post;
				error = clientData.error;
			} catch (e) {
				loadArticle(data.slug).then((clientData) => {
					post = clientData.post;
					error = clientData.error;
					sessionStorage.setItem(`thisjtme_blog_${data.slug}`, JSON.stringify(clientData));
				});
			}
		} else {
			sessionStorage.setItem(`thisjtme_blog_${data.slug}`, JSON.stringify({ error: false, time: new Date().getTime(), post }));
		}

		return () => {
			portfolioContent.removeEventListener('click', blogContentImageHandler);
			imageViewer.removeEventListener('click', imageViewerHandler);
		};
	});

	/**@param {MouseEvent} e*/
	function imageViewerHandler(e) {
		if (/**@type {HTMLDivElement}*/ (e.target).classList.contains('imageViewer')) {
			imageViewer.style.opacity = '0';
			imageViewer.style.pointerEvents = 'none';
		}
	}

	/**@param {MouseEvent} e*/
	function blogContentImageHandler(e) {
		const target = /**@type {HTMLElement}*/ (e.target);
		const ahref = target.closest('a');
		const ahrefimage = ahref?.querySelector('img');
		if (ahref && ahrefimage) {
			e.preventDefault();
			imageViewer.style.opacity = '1';
			imageViewer.style.pointerEvents = '';

			const img = document.createElement('img');
			img.alt = ahrefimage.alt;
			img.src = ahref.href;
			imageHolder.innerHTML = '';
			imageHolder.appendChild(img);
			imageHolder.href = ahref.href;
			imageCaption.innerHTML = `Caption: ${ahrefimage.alt}`;
		}
	}
</script>

<SvelteSEO
	title={`${post?.title.toLowerCase() || 'error'} | portfolio - thisjt.me personal website`}
	description={post?.content
		? contentStrip(post.content).split(' ').length > 40
			? `${contentStrip(post.content).split(' ').slice(0, 40).join(' ')} ...`
			: contentStrip(post.content)
		: 'error - This portfolio page does not exist'}
	canonical={`https://thisjt.me/portfolio/${post?.slug || 'error'}`}
	keywords="thisjt, thisjtme, personal website, personal, github, software developer"
	openGraph={{
		title: `${post?.title.toLowerCase() || 'error'} | portfolio - thisjt.me personal website`,
		description: post?.content
			? contentStrip(post.content).split(' ').length > 40
				? `${contentStrip(post.content).split(' ').slice(0, 40).join(' ')} ...`
				: contentStrip(post.content)
			: 'error - This portfolio page does not exist',
		url: `https://thisjt.me/portfolio/${post?.slug || 'error'}`,
		type: 'article',
		images: [
			{
				url: 'https://thisjt.me/social2.png',
				width: 762,
				height: 400,
				alt: "thisjt's social banner with address and social media links",
			},
		],
	}} />
<svelte:head>
	{#if !post}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>
<PageTitle text={`${post?.title.toLowerCase() || 'error'} | portfolio`} />
<div class="w-full px-4" bind:this={portfolioContent}>
	<PageHeader level="h2" heading="Portfolio" goback="/portfolio" />
	{#if post}
		<div class="mb-4 mt-6 text-center">
			<h1 class="text-4xl font-bold text-white">{post.title}</h1>
		</div>
		<p class="portfolioBody mb-4">{@html post.content}</p>
	{:else}
		<div class="flex justify-center">
			<div class="h-1 grow"></div>
			<div class="mt-3 flex h-10 w-1/3 grow animate-pulse flex-col rounded-lg bg-base-100 pb-3 transition"></div>
			<div class="h-1 grow"></div>
		</div>
		<div class="mt-12 flex h-64 w-full grow animate-pulse flex-col rounded-lg bg-base-100 pb-3 transition"></div>
		<div class="mt-12 flex h-6 w-full grow animate-pulse flex-col rounded-lg bg-base-100 pb-3 transition"></div>
		<div class="mt-4 flex h-6 w-full grow animate-pulse flex-col rounded-lg bg-base-100 pb-3 transition"></div>
		<div class="my-4 flex h-6 w-full grow animate-pulse flex-col rounded-lg bg-base-100 pb-3 transition"></div>
	{/if}
	{#if error}
		<p class="pt-4">An error has occurred.</p>
		<p class="pt-4">
			This portfolio entry does not exist anymore. If you followed a proper link, please do tell me along with the URL you are trying to go to and I'll try to sort it out.
		</p>
	{/if}
</div>
<div
	class="imageViewer | fixed inset-0 flex cursor-pointer flex-col items-center justify-center bg-black bg-opacity-80 transition"
	bind:this={imageViewer}
	style="opacity:0;pointer-events:none">
	<div>
		<div class="flex justify-end">
			<button
				on:click={() => {
					imageViewer.style.opacity = '0';
					imageViewer.style.pointerEvents = 'none';
				}}
				class="fixed right-4 top-4 p-2 transition sm:right-24 sm:top-16 hover:sm:bg-primary">
				<img src="/assets/x.png" alt="" />
			</button>
		</div>
		<a class="block" bind:this={imageHolder} target="_blank" href="/">-</a>
		<div bind:this={imageCaption} class="mt-4 cursor-text"></div>
	</div>
</div>

<style>
	:global(.portfolioBody ul, .portfolioBody ol) {
		list-style: initial;
		margin: 1rem;
	}
</style>
