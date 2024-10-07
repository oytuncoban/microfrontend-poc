import { TFunction } from "i18next";
import seedrandom from "seedrandom";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../store/useCartStore";

const generateUniqueIntId = (id: string) => {
	return Number.parseInt(id.replace(/-/g, ""), 16) % 1000000;
};

export const generateProducts = (
	count: number,
): Item[] => {
	const rng = seedrandom("product-seed");
	return Array.from({ length: count }).map(() => {
		const id = uuidv4();
		return {
			id,
			name: `${generateUniqueIntId(id)}`,
			price: Math.floor(rng() * 100),
		};
	});
};

export default generateProducts;
