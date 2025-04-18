<script lang="ts">
	const { data } = $props();
	const { isAdmin } = data;
	import { enhance} from '$app/forms';


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
		<form method="POST" action="/login" use:enhance>
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" required>
			<br>
			<button type="submit">Login</button>
		</form>
	</div>
{/if}
</div>