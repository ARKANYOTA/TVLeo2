export async function GET({cookies}){
	cookies.delete('admin_password', {
		path: '/'
	});
	return new Response("Nice t'est logout", { status: 200 });
}