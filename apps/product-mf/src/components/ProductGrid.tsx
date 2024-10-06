import type React from "react";
import ProductCard, { type Item } from "./ProductCard";

export const ProductGrid: React.FC<{ items: Array<Item> }> = ({ items }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{items.map((item, index) => (
				<ProductCard key={index.toString()} item={item} />
			))}
		</div>
	);
};

export default ProductGrid;
