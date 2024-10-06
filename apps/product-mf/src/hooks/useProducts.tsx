import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import seedrandom from "seedrandom";
import { v4 as uuidv4 } from "uuid";

const generateUniqueIntId = (id: string) => {
	return Number.parseInt(id.replace(/-/g, ""), 16) % 1000000;
};
function useProducts() {
	const { t } = useTranslation("product");
	const rng = seedrandom("product-seed");
	const products = useMemo(() => {
		return Array.from({ length: 48 }).map((_, index) => {
			const id = uuidv4();

			return {
				id,
				name: `${t("item.placeholder")} ${generateUniqueIntId(id)}`,
				price: Math.floor(Math.random() * 100),
			};
		});
	}, []);
	const featuredProducts = useMemo(() => {
		return Array.from({ length: 10 }).map((_, index) => {
			const id = uuidv4();
			return {
				id,
				name: `${t("item.placeholder")} ${generateUniqueIntId(id)}`,
				price: Math.floor(Math.random() * 100),
			};
		});
	}, []);

	return { products, featuredProducts };
}

export default useProducts;
