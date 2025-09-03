<script lang="ts">
	import { assets } from '$app/paths';
	export let src: string;
	export let alt: string = '';
	export let className: string = '';
</script>

<img src={`${assets}/${src}`} alt={alt} class={className} />