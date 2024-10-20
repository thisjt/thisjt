<script>
	import Socials from './Socials.svelte';
</script>

<div class="iamasidebar | sticky top-4 flex w-full gap-4 rounded-2xl bg-neutral p-4 lg:flex-col">
	<div class="flex w-4/12 items-center justify-center md:w-1/5 lg:w-full">
		<div class="rounded-2xl bg-secondary p-3 lg:mx-auto lg:mt-12 lg:w-1/2">
			<img class="w-full lg:hidden" src="/branding/me-chill-headonly.png" alt="" />
			<img class="hidden w-full lg:block" src="/branding/me.gif" alt="" />
		</div>
	</div>
	<div class="flex w-8/12 flex-col justify-center lg:w-full lg:text-center">
		<div class="text-2xl font-bold">Joshua Tahanlangit</div>
		<div class="mx-4 my-4 hidden h-0.5 bg-secondary lg:block"></div>
		<div class="w-full text-left text-gray-400"><span class="hidden sm:inline">Software</span> Frontend Developer</div>
		<div class="w-full text-left text-gray-400">Cebu City, Philippines 6000</div>
	</div>
	<div class="hidden flex-col gap-2 pt-2 md:flex lg:w-full">
		<Socials />
	</div>
</div>

<style>
	.iamasidebar {
		view-transition-name: iamasidebar;
	}
</style>
