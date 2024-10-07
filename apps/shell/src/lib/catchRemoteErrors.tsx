export function catchRemoteErrors(err: unknown) {
	if (err instanceof Error && err.message.includes("ERR_001")) {
		console.error("Failed to load CartButton", err);
	} else {
		console.error(err);
	}
	return { default: () => (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<h2>Oops! Something went wrong.</h2>
			<p>We couldn't load the requested component. Please try again later.</p>
		</div>
	), };
}
