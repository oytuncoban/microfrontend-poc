import React, { Suspense } from "react";
import { catchRemoteErrors } from "../lib/catchRemoteErrors";

const ProductApp = React.lazy(() =>
	import("productMF/ProductApp")
		.then((module) => {
			return module;
		})
		.catch(catchRemoteErrors),
);

function Products() {
	return (
		<Suspense fallback="Loading...">
			<ProductApp />
		</Suspense>
	);
}

export default Products;
