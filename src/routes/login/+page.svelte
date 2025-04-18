<script lang="ts">
	const { data } = $props();
	const { isAdmin } = data;
	import { enhance} from '$app/forms';

	async function logined(e: Event) {
		e.preventDefault();
		const response = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password: document.getElementById('password')?.value })
		});
		if (response.ok) {
			const login_response = await response.json();
			if (login_response.success) {
				window.location.href = '/admin';
			} else {
				alert('Login failed');
			}
		} else {
			alert('Login failed');
		}
	}

</script>
<div>
{#if isAdmin}
	<div>
		<p>Hey bro, t'est deja login</p>
		<p>Tu peux aller sur la page admin</p>
		<a href="/admin">Admin</a>
	</div>
{:else}
	<div>
		<h1>Login</h1>
		<form method="POST" on:submit|preventDefault={logined} id="form-data">
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" required>
			<br>
			<button type="submit">Login</button>
		</form>
	</div>
{/if}
</div>