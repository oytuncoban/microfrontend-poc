import type { Item } from "@/store/useCartStore";
import type React from "react";
import ProductCard from "./ProductCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/Carousel";

export const ProductCarousel: React.FC<{
	items: Array<Item>;
}> = ({ items }) => {
	return (
		<div className="w-full flex align-middle justify-center">
			<Carousel className="max-w-[20rem] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg ">
				<CarouselContent className="w-3/4">
					{items.map((item, index) => (
						<CarouselItem
							key={index.toString()}
							className="basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis:1/4"
						>
							<ProductCard item={item} variant="featured" />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default ProductCarousel;
