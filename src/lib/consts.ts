export const pixelSize = 10;
export const pixelWidth = 55;
export const pixelHeight = 31;
export const eraserColor = 0;
export const colors = ["#ffffff", "#181425" , "#ff0044", "#68386c", "#b55088", "#f6757a", "#e8b796", "#c28569", "#be4a2f", "#d77643", "#ead4aa", "#e4a672", "#b86f50", "#733e39", "#3e2731", "#a22633", "#e43b44", "#f77622", "#feae34", "#fee761", "#63c74d", "#3e8948", "#265c42", "#193c3e", "#124e89", "#0099db", "#2ce8f5", "#c0cbdc", "#8b9bb4", "#5a6988", "#3a4466", "#262b44"]
export const indexs = [ "0", "1", "2", "3", "4", "5", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export let rgbs_colors: Array<Array<number>> = []
for (let i = 0; i < colors.length; i++){
	let color = colors[i].replace("#", "")
	let s_color: number = parseInt(color, 16)

	let r = (s_color >> 16) & 0xff
	let g = (s_color >> 8) & 0xff
	let b = s_color & 0xff


	rgbs_colors.push([r,g,b])
}


