import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ProductRoutes from "./routes";
import "./styles/index.css";
import "./config/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ProductRoutes />
		</BrowserRouter>
	</React.StrictMode>,
);
