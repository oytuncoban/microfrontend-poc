import { Route, Routes } from "react-router-dom";
import { ProductDetails, ProductList } from "./pages";

export const ProductRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<ProductList />} />
			<Route path=":id" element={<ProductDetails />} />
		</Routes>
	);
};

export default ProductRoutes;
