import type React from "react";
import CartIconSVG from "../../assets/icons/CartIconSVG.svg";

export const CartButtonWithCount: React.FC<{ cartCount: number }> = ({
	cartCount,
}) => {
	return (
		<div className="relative">
			<img alt="CartIcon" src={CartIconSVG} />
			<div className="bg-amber-600 absolute bottom-[-10px] left-[-10px] w-5 h-5 rounded-full text-white">
				<div className="flex place-items-center justify-center text-center h-full text-[9px]">
					{cartCount > 99 ? "99+" : cartCount}
				</div>
			</div>
		</div>
	);
};

export default CartButtonWithCount;
