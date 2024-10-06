import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import useProducts from "@/hooks/useProducts";
import { useTranslation } from "react-i18next";

export const ProductList: React.FC = () => {
	const { products, featuredProducts } = useProducts();

	return (
		<div className="flex flex-col gap-8">
			<ProductCarousel items={featuredProducts} />
			<ProductGrid items={products} />
		</div>
	);
};

export default ProductList;
