<script>
	// @ts-expect-error: untyped library
	import SocialIcons from '@rodneylab/svelte-social-icons';
	export let miniicons = false;

	const socials = [
		{
			icon: 'email',
			social: 'Email',
			text: 'contact@thisjt.me',
			link: 'mailto:contact@thisjt.me',
		},
		{
			icon: 'github',
			social: 'Github',
			text: 'thisjt',
			link: 'https://github.com/thisjt',
		},
		{
			icon: 'linkedin',
			social: 'LinkedIn',
			text: 'in/thisjt',
			link: 'https://www.linkedin.com/in/thisjt/',
		},
		{
			icon: 'stackoverflow',
			social: 'Stackoverflow',
			text: 'u/thisjt',
			link: 'https://stackoverflow.com/users/2334332/thisjt',
		},
	];
</script>

{#if miniicons}
	{#each socials as social}
		<a href={social.link} target="_blank" class="flex cursor-pointer items-center rounded-lg hover:bg-base-100">
			<div class="flex items-center justify-center rounded-lg px-2 text-center">
				<SocialIcons network={social.icon} width="32" height="32" fgColor="#ffffff" bgColor="#009dff" />
			</div>
			<div class="text-xs">{social.social}</div>
		</a>
	{/each}
{:else}
	{#each socials as social}
		<a href={social.link} target="_blank" class="flex cursor-pointer rounded-lg hover:bg-base-100 lg:p-2">
			<div class="hidden grow items-center justify-end pl-2 text-gray-400 md:flex lg:hidden">
				{social.text}
			</div>
			<div class="mr-4 flex items-center justify-center rounded-lg px-2 text-center">
				<SocialIcons network={social.icon} width="32" height="32" fgColor="#ffffff" bgColor="#009dff" />
			</div>
			<div class="md:hidden lg:block">
				<div class="text-sm text-gray-400">{social.social}</div>
				<div class="">{social.text}</div>
			</div>
		</a>
	{/each}
{/if}
