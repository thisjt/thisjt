<script>
	import '@fontsource/open-sans';
	import '../styles/app.css';
	import '../styles/main.scss';
	import Sidebar from './Sidebar.svelte';
	import Socials from './Socials.svelte';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { hydrate } from '$lib/firstload';
	import { onMount } from 'svelte';

	let currentPage = writable('');

	onMount(hydrate);

	afterNavigate(() => {
		$currentPage = window.location.pathname.split('/')[1];
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="m-4 flex flex-col gap-4 lg:mx-auto lg:mt-12 lg:w-[1024px] lg:flex-row">
	<div class="flex flex-col lg:w-4/12">
		<Sidebar />
	</div>
	<div class="rounded-2xl bg-neutral lg:w-8/12">
		<div class="flex rounded-tl-2xl rounded-tr-2xl bg-secondary text-sm text-white sm:text-lg">
			<a href="/" class="{$currentPage === '' ? '!bg-primary' : ''} grow rounded-tl-2xl py-4 text-center font-bold hover:bg-primary sm:w-auto sm:px-5">About</a>
			<a href="/resume" class="{$currentPage === 'resume' ? '!bg-primary' : ''} grow py-4 text-center font-bold hover:bg-primary sm:w-auto sm:px-5">Resume</a>
			<a href="/portfolio" class="{$currentPage === 'portfolio' ? '!bg-primary' : ''} grow py-4 text-center font-bold hover:bg-primary sm:w-auto sm:px-5">Portfolio</a>
			<a href="/blog" class="{$currentPage === 'blog' ? '!bg-primary' : ''} grow py-4 text-center font-bold hover:bg-primary sm:w-auto sm:px-5">Blog</a>
			<a href="/contact" class="{$currentPage === 'contact' ? '!bg-primary' : ''} grow rounded-tr-2xl py-4 text-center font-bold hover:bg-primary sm:w-auto sm:px-5">Contact</a>
		</div>
		<slot />
	</div>
	<div class="miniicons | md:hidden">
		<div class="mb-2 font-bold">Keep in Touch!</div>
		<div class="flex flex-wrap gap-3">
			<Socials miniicons={true} />
		</div>
	</div>
</div>

<style>
	.miniicons {
		view-transition-name: miniicons;
	}
</style>
