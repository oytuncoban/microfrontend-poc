import type { Resource, i18n } from "i18next";
export declare function getResources(sourceI18n: i18n): Resource | undefined;
export declare function addResources(resources: Resource, sourceNs: string, targetInstance: i18n): void;
