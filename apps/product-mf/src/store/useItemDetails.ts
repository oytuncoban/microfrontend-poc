import useCartStore, { type ItemWithQuantity } from "./useCartStore";

export const useItemDetails = (id: string) => {
	const cartItems = useCartStore((state) => state.cartItems);
	const isItemInCart = getIsItemInCart(cartItems, id);
	const itemQuantity = getItemQuantity(cartItems, id);

	return {
		isItemInCart,
		itemQuantity,
	};
};

const getIsItemInCart = (cartItems: ItemWithQuantity[], id: string) => {
	return cartItems.some((i) => i.id === id);
};

const getItemQuantity = (cartItems: ItemWithQuantity[], id: string) => {
	const item = cartItems.find((i) => i.id === id);
	return item?.quantity ?? 0;
};

export default useItemDetails;
