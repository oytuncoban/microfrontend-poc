import type { Resource, i18n } from "i18next";

export function getResources(sourceI18n: i18n) {
	return sourceI18n.options.resources;
}

export function addResources(
	resources: Resource,
	sourceNs: string,
	targetInstance: i18n,
) {
	for (const lng of Object.keys(resources)) {
		const resource = resources[lng][sourceNs];
		targetInstance.addResourceBundle(lng, sourceNs, resource);
	}
}
