import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import { useProductStore } from "@/store/useCartStore";
import type React from "react";

export const ProductList: React.FC = () => {
	const { products, featuredProducts } = useProductStore();

	return (
		<div className="flex flex-col gap-8 overflow-auto">
			<ProductCarousel items={featuredProducts} />
			<ProductGrid items={products} />
		</div>
	);
};

export default ProductList;
