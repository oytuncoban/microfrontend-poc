import type { i18n } from "i18next";
import { I18nextProvider, useTranslation } from "react-i18next";
import { addResources } from "../../../packages/shared/src/lib/i18nUtils";
import resources from "./config/resources";
import { ProductRoutes } from "./routes";
import "./styles/remote.css";

function App({ i18n }: { i18n?: i18n }) {
	const { i18n: _i18n } = useTranslation();
	const __i18n = i18n || _i18n;
	if (__i18n?.store) {
		addResources(resources, "product", __i18n);
	}

	return <I18nextProvider i18n={__i18n}>{<ProductRoutes />}</I18nextProvider>;
}

export default App;
