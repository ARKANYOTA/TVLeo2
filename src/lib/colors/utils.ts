import { rgbs_colors } from '$lib/consts';

export function closestColorIndex( rgb: Array<number>, ): number {
	let closestIndex = -1;
	let closestDistance = Infinity;

	for (let i = 0; i < rgbs_colors.length; i++) {
		const color = rgbs_colors[i];
		const distance =
			Math.abs(color[0] - rgb[0]) +
			Math.abs(color[1] - rgb[1]) +
			Math.abs(color[2] - rgb[2]);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = i;
		}
	}

	return closestIndex;
}