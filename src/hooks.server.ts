import { redirect, type RequestEvent } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { ADMIN_PASSWORD } from '$env/static/private';
import type { ResolveOptions } from 'vite';
import type { localsType } from '$lib/types';

interface eventInterface extends RequestEvent<Partial<Record<string, string>>, string | null> {
	locals: localsType;
}
type ResolveType = (event: RequestEvent, opts?: ResolveOptions) => Response | Promise<Response>;
export const handle = async ({ event, resolve }: {event: eventInterface, resolve: ResolveType}) => {
	const adminPassword = event.cookies.get("admin_password");

	if(adminPassword === ADMIN_PASSWORD) {
		event.locals.admin = true;
		return resolve(event);
	}

	event.locals.admin = false;

	if (!event.url.pathname.startsWith("/admin")) {
		return redirect(302, '/login');
	}
	return resolve(event);
};

