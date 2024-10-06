export function catchRemoteErrors(err: unknown) {
	if (err instanceof Error && err.message.includes("ERR_001")) {
		console.error("Failed to load CartButton", err);
	} else {
		console.error(err);
		throw err;
	}
	return { default: () => <></> };
}
