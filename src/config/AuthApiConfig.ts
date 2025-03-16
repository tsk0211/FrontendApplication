const AUTH_API_CONFIG = {
	HOST_URL: "http://localhost:9090", // Replace with your actual API base URL
	SECURITY_VERSION: "/api/v1/security",
	AUTH_ENDPOINT: "/auth",
	CSRF_ENDPOINT: "/csrf_token",
	NO_OF_RETRY: 2,
	devMode: false,

	CSRF_VAR: "csrfToken"
};

export default AUTH_API_CONFIG;
