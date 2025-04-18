import { ADMIN_PASSWORD } from '$env/static/private';

export async function POST({request, cookies}){
	const data = await request.json();
	const { password } = data;
	if (!password) return new Response(JSON.stringify({ message: "invalid" }), { status: 400 });

	if(password === ADMIN_PASSWORD){
		cookies.set("admin_password", password, {
			path: '/'
		})
		return new Response(JSON.stringify({ success: true }), { status: 200 });
		// return {success: true};
	}
	return new Response(JSON.stringify({ message: "invalid" }), { status: 400 });

	// const { password } = await request.json();

	// if (!password) return new Response(JSON.stringify({error: "no password"}), { status: 400 });

	// if(password === ADMIN_PASSWORD){
	// 	cookies.set("admin_password", password, {
	// 		path: '/'
	// 	})
	// 	return new Response(JSON.stringify({success: true}), { status: 200 });
	// }
	// return new Response(JSON.stringify({error: "wrong password"}), { status: 401 });



}
