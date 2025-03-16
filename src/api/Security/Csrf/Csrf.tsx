import AUTH_API_CONFIG from "../../../config/AuthApiConfig.ts";

const getCsrfToken = async () => {
	const { HOST_URL, SECURITY_VERSION, CSRF_ENDPOINT, CSRF_VAR } = AUTH_API_CONFIG;
	// Check if CSRF token exists in the session storage or cookie
	let csrfToken = sessionStorage.getItem(CSRF_VAR);
	if (!csrfToken) {
		// If the token doesn't exist, call the server to retrieve it
		try {
			const response = await fetch(HOST_URL + SECURITY_VERSION + CSRF_ENDPOINT, {
				method: "GET",
				credentials: "include", // Ensure cookies are sent with the request if needed
			});

			if (response.ok) {
				const data = await response.json();
				csrfToken = data.responseBody;

				// Store the CSRF token in sessionStorage for future requests
				csrfToken ?? sessionStorage.setItem(CSRF_VAR, csrfToken ?? "");
			} else {
				throw new Error("Failed to fetch CSRF token");
			}
		} catch (error) {
			console.error("Error fetching CSRF token:", error);
			throw error;
		}
	}
	return csrfToken;
};

export default getCsrfToken;
