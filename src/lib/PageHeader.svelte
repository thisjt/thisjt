<script>
	export let heading;
	export let level = 'h1';
	export let description = '';
	export let goback = '';
</script>

<div class="flex">
	<div class="my-4">
		{#if level === 'h1'}
			<h1 class="text-2xl font-bold">{heading}</h1>
		{:else if level === 'h2'}
			<h2 class="text-2xl font-bold">{heading}</h2>
		{:else if level === 'h3'}
			<h3 class="text-2xl font-bold">{heading}</h3>
		{:else if level === 'h4'}
			<h4 class="text-2xl font-bold">{heading}</h4>
		{:else if level === 'h5'}
			<h5 class="text-2xl font-bold">{heading}</h5>
		{:else if level === 'h6'}
			<h6 class="text-2xl font-bold">{heading}</h6>
		{:else}
			{heading}
		{/if}
	</div>
	<div class="{description ? 'sm:block' : ''} m-4 ml-12 hidden grow text-right text-xs text-gray-400">{description}</div>
	<div class="flex grow items-center justify-end {goback ? '' : 'hidden'}">
		<a href={goback} class="cursor-pointer rounded-lg bg-secondary px-3 py-1.5 transition hover:bg-primary">Go Back</a>
	</div>
</div>
<div class="mb-2 text-xs text-gray-400 sm:hidden">{description}</div>

<div class="mb-4 ml-4 h-1 w-16 bg-secondary"></div>
