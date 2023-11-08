<script lang="ts">
    import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
    import * as config from '$lib/config';

    //Current Dark/Light Mode
	import { modeCurrent } from '@skeletonlabs/skeleton';
	console.log(modeCurrent);
	let iconGitHub: string;

	$: {
		iconGitHub = $modeCurrent ? '/logos/github-mark.png' : '/logos/github-mark-white.png';
	}
</script>
<AppBar>
    <!-- Left-side Header -->
    <svelte:fragment slot="lead">
        <a href="/">
            <div class="items-center align-middle flex gap-2">
                <img src="/images/Logo.png" alt="Logo" class="w-8 h-8" />

                <strong class="text-3xl uppercase">{config.title}</strong>
            </div>
        </a>
    </svelte:fragment>
    <svelte:fragment slot="headline">
        <strong>Blog about the struggles of building a blog!</strong>
    </svelte:fragment>
    <!-- Right-side Header -->
    <svelte:fragment slot="trail">
        <!-- LinkedIn -->
        <a
            class="btn btn-sm variant-ghost-surface"
            href="https://www.linkedin.com/in/matthieu-morin-7524731a9/"
            target="_blank"
            rel="noreferrer"
        >
            <img
                src="/logos/LI-In-Bug.png"
                width="24"
                height="24"
                alt="Matt's LinkedIn Acount"
            />
        </a>
        <!-- github -->
        <a
            class="btn btn-sm variant-ghost-surface"
            href="https://github.com/matthieu42morin"
            target="_blank"
            rel="noreferrer"
        >
            <img src={iconGitHub} width="24" height="24" alt="Github account" />
        </a>

        <LightSwitch />
    </svelte:fragment>
</AppBar>