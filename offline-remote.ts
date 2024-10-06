import type { FederationRuntimePlugin } from "@module-federation/enhanced/runtime";

export default function (): FederationRuntimePlugin {
	return {
		name: "offline-remote-plugin",
		errorLoadRemote({ id, error, from, origin }) {
			console.error("Remote: ", id, "is offline offline: ", error);

			throw new Error("ERR_001", {
				cause: {
					id,
					error,
					from,
					origin,
				},
			});
		},
	};
}
