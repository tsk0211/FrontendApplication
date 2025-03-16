import { JwtTokenDTO } from "../../../model/Auth/JwtToken.tsx";
import API_CONFIG from "../../../config/AuthApiConfig.ts";
import getCsrfToken from "../Csrf/Csrf.tsx";

const { HOST_URL, SECURITY_VERSION, AUTH_ENDPOINT, NO_OF_RETRY, devMode } = API_CONFIG;

const authenticate = async (username: string, password: string) => {
	let csrfToken: string | null = await getCsrfToken(); // Ensure CSRF token is available
	var counter: number = 0;

	const url = `${HOST_URL}${SECURITY_VERSION}${AUTH_ENDPOINT}` + (devMode ? "?debug=true" : "");

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": csrfToken ?? "", // Attach CSRF token to headers
			},
			body: JSON.stringify({ username, password }),
			credentials: "include", // Ensure cookies are sent with the request
		});

		// If the CSRF token is invalid or expired, refresh it and try again
		if (response.status === 403 && counter < NO_OF_RETRY) {
			counter = counter + 1;
			await getCsrfToken(); // Refresh CSRF token
			return authenticate(username, password); // Retry with new token
		} else if (counter > NO_OF_RETRY) {
			alert(response.status + ` : Username ${username}  Password ${password}`);
		}

		if (!response.ok) {
			throw new Error("Authentication failed");
		}

		const data: JwtTokenDTO = await response.json();
		return data; // Assuming the response contains the user data or token
	} catch (error) {
		console.error("Error during authentication:", error);
		throw error;
	}
};

export default authenticate;
