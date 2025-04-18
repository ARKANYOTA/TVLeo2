<script lang="ts">
	import { onMount } from 'svelte';
	import { pixelHeight, pixelWidth } from '$lib/consts';
	import RenderCanvas from '$lib/RenderCanvas.svelte';

	const { data } = $props();
	const { isAdmin } = data;

	let liste: undefined | Array<any> = $state(undefined);
	let selectedImage: undefined | string = $state(undefined);
	let frames: number = $state(1);
	let currentFrame: number = $state(0);

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
			selectedImage = id;
			const image_response = await response.json();
			const image = image_response.image;
			frames = image.bytes.length;
			currentFrame = 0;
			bytes = image.bytes;
			change_bytes();
		} else {
			console.error('Failed to load image');
		}
	}

	let change_bytes_Component: any = $state(undefined);

	function change_bytes() {
		// Force pour comprendre: https://stackoverflow.com/questions/58287729/how-can-i-export-a-function-from-a-svelte-component-that-changes-a-value-in-the
		change_bytes_Component.change_bytes(bytes[currentFrame]);
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
			load_list();
		} else {
			console.error('Failed to delete image');
		}
	}

	let selected: string = $state("all");

	function onChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			selected = target.value;
		}
	}

</script>

<div>
	{#if isAdmin}
		<label>
			<input checked={selected==="onlyApproved"} onchange={onChange} type="radio" name="amount" value="onlyApproved" /> Only Approved
		</label>
		<label>
			<input checked={selected==="toApprove"} onchange={onChange} type="radio" name="amount" value="toApprove" /> To Approve
		</label>
		<label>
			<input checked={selected==="all"} onchange={onChange} type="radio" name="amount" value="all" /> All
		</label>



		{#if onlyApproved}
			<p>Only showing approved images</p>
		{:else}
			<p>Showing all images</p>
		{/if}
		{#if liste}
			<ul>
				{#each liste as img}
					{#if selected === "onlyApproved" && !img.approved}
						<!-- Skip this image -->
					{:else if selected === "toApprove" && img.approved}
						<!-- Skip this image -->
					{:else}
						<li>
							{#if selectedImage === img.id}
								Selected image:
							{/if}
							{#if selectedImage !== img.id}
								<button onclick={() => get_image(img.id)}>Get Image</button>
							{/if}
							{img.id} - {img.name} - {img.description} -
							{#if !img.approved}
								<button onclick={() => approve_image(img.id)}>A</button>
							{/if}
							<button onclick={() => delete_image(img.id)}>X</button>
						</li>
					{/if}
				{/each}
			</ul>
		{:else}
			<p>Loading...</p>
		{/if}

		<button onclick={load_list}>Refresh List</button>

		<br/>

		<RenderCanvas bind:this={change_bytes_Component} />
		<br/>
		{#each { length : frames } as _, i}
			<button onclick={() => {
				currentFrame = i;
				change_bytes();
			}}>Frame {i}</button>
		{/each}



	{:else}
		<p>T'es vraiment pas censé être ici bro</p>
	{/if}
</div>
