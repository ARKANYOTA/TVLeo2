import type { localsType } from '$lib/types';

export const load = ({ locals }: {locals: localsType}) => {
	return {
		isAdmin: locals.admin
	}
};