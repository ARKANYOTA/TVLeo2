<script lang="ts">
	import { onMount } from 'svelte';
	import { pixelHeight, pixelWidth } from '$lib/consts';
	import RenderCanvas from '$lib/RenderCanvas.svelte';

	const { data } = $props();
	const { isAdmin } = data;

	let liste: undefined | Array<any> = $state(undefined);

	onMount(() => {
		load_list();
	})

	async function load_list() {
		const response = await fetch('admin/get_list', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});
		if (response.ok) {
			const liste_response = await response.json();
			liste = liste_response.liste;
			console.log(liste);
		} else {
			console.error('Failed to load list');
		}
	}

	// TODO:
	let onlyApproved = $state(false);

	let bytes: string = $state("0".repeat(pixelWidth*pixelHeight));
	async function get_image(id: string) {
		const response = await fetch(`/admin/get_image/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});
		if (response.ok) {
			const image_response = await response.json();
			const image = image_response.image;
			bytes = image.bytes;
			change_bytes();
		} else {
			console.error('Failed to load image');
		}
	}

	let change_bytes_Component: any = $state(undefined);

	function change_bytes() {
		// Force pour comprendre: https://stackoverflow.com/questions/58287729/how-can-i-export-a-function-from-a-svelte-component-that-changes-a-value-in-the
		change_bytes_Component.change_bytes(bytes);
	}

	async function approve_image(id: string) {
		const response = await fetch(`/admin/approve_image/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});
		if (response.ok) {
			console.log('Image approved');
			load_list();
		} else {
			console.error('Failed to approve image');
		}
	}

	async function delete_image(id: string) {
		const response = await fetch(`/admin/delete_image/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});
		if (response.ok) {
			console.log('Image deleted');
			load_list();
		} else {
			console.error('Failed to delete image');
		}
	}

</script>

<div>
	{#if isAdmin}
		<input type="checkbox" bind:checked={onlyApproved} id="onlyApproved">
		<label for="onlyApproved">Only show approved</label>

		{#if onlyApproved}
			<p>Only showing approved images</p>
		{:else}
			<p>Showing all images</p>
		{/if}
		{#if liste}
			<ul>
				{#each liste as img}
					<li>{img.id} - {img.name} - {img.description} -
						<button onclick={() => get_image(img.id)}>Get Image</button>
						{#if !img.approved}
							<button onclick={() => approve_image(img.id)}>A</button>
						{/if}
						<button onclick={() => delete_image(img.id)}>X</button>
					</li>
				{/each}
			</ul>
		{:else}
			<p>Loading...</p>
		{/if}

		<button onclick={load_list}>Refresh List</button>

		<br/>

		<RenderCanvas bind:this={change_bytes_Component} />



	{:else}
		<p>T'es vraiment pas censé être ici bro</p>
	{/if}
</div>
