import type { i18n } from "i18next";
import { I18nextProvider, useTranslation } from "react-i18next";
import { addResources } from "../../../packages/shared/src/lib/i18nUtils";
import resources from "./config/resources";
import { ProductRoutes } from "./routes";
import "./styles/remote.css";

function App() {
	const { i18n } = useTranslation();
	if (i18n) {
		addResources(resources, "product", i18n);
	}

	return <I18nextProvider i18n={i18n}>{<ProductRoutes />}</I18nextProvider>;
}

export default App;
