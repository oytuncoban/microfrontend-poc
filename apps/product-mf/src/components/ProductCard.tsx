import { cn } from "@/lib/utils";
import useCartStore from "@/store/useCartStore";
import useItemDetails from "@/store/useItemDetails";
import { ImageIcon } from "@radix-ui/react-icons";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

export type Item = {
	id: string;
	name: string;
	price: number;
};

const MockImage: React.FC<{ item: Item }> = ({ item }) => {
	return (
		<Link
			to={`${item.id}`}
			className="w-full aspect-square bg-gray-200 rounded-md overflow-hidden flex items-center justify-center"
		>
			<ImageIcon className="w-1/2 h-1/2 text-gray-400" />
		</Link>
	);
};

export const ProductCard: React.FC<{
	item: Item;
	variant?: "featured" | "default";
}> = ({ item, variant = "default" }) => {
	const { t } = useTranslation("product");
	return (
		<div className="p-1 border border-gray-100 rounded-md">
			<div className="flex flex-col items-start gap-4 justify-between p-2">
				<MockImage item={item} />

				<Link to={`${item.id}`}>
					<span className="text-xs md:text-sm lg:text-md">{t("item.placeholder")} {item.name}</span>
				</Link>

				<div
					className={cn(
						"flex items-center justify-between w-full mt-auto",
						{
							featured: "flex-col gap-2",
							default: "flex-row",
						}[variant],
					)}
				>
					<span className="text-sm md:text-md lg:text-lg font-semibold">
						${item.price}
					</span>

					<ProductCardButton item={item} variant={variant} />
				</div>
			</div>
		</div>
	);
};

const ProductCardButton: React.FC<{
	item: Item;
	variant?: "featured" | "default";
}> = ({ item, variant = "featured" }) => {
	const { t } = useTranslation("product");
	const addToCart = useCartStore((state) => state.addToCart);
	const removeOneFromCart = useCartStore((state) => state.removeOneFromCart);
	const { itemQuantity } = useItemDetails(item.id);

	if (itemQuantity > 0) {
		return (
			<div className="flex flex-row items-center">
				<Button
					className="px-2 py-1 bg-amber-600 text-white font-mono rounded-md"
					onClick={() => removeOneFromCart(item)}
				>
					-
				</Button>
				<div className="px-2 bg-amber-100">{itemQuantity}</div>
				<Button
					className="px-2 py-1 bg-amber-600 text-white font-mono rounded-md"
					onClick={() => addToCart(item)}
				>
					+
				</Button>
			</div>
		);
	}

	return (
		<Button
			className="px-2 py-1 bg-amber-600 text-white font-mono rounded-md"
			onClick={() => addToCart(item)}
		>
			{t(
				`button.${
					{
						featured: "buyNow",
						default: "addToCart",
					}[variant]
				}`,
			)}
		</Button>
	);
};

export default ProductCard;
