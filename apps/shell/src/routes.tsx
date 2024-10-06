import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/products" />} />
			<Route path="/home" element={<Home />} />
			<Route path="/products/*" element={<Products />} />
			<Route path="*" element={<Navigate to="/home" />} />
		</Routes>
	);
};

export default AppRoutes;
