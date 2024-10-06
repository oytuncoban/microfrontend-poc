import useCartStore from "@/store/useCartStore";
import type React from "react";
import { Link } from "react-router-dom";
import CartButtonWithCount from "../../../../packages/shared/src/components/ui/CartButtonWithCount";

export const CartButton: React.FC = () => {
	const cartCount = useCartStore((state) => state.cartCount);

	return (
		<Link to="/home">
			<CartButtonWithCount cartCount={cartCount} />
		</Link>
	);
};

export default CartButton;
