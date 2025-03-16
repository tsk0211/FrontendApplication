import React, { useState } from "react";
import authenticate from "../../../../api/Security/Auth/Auth";
import styles from "../Login.module.css";

interface LoginComponentProps {
	onClose: () => void;
}

interface FormState {
	username: string;
	password: string;
	rememberMe: boolean;
	stayLoggedIn: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onClose }) => {
	const [formState, setFormState] = useState<FormState>({
		username: "",
		password: "",
		rememberMe: false,
		stayLoggedIn: false,
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormState) => {
		setFormState({
			...formState,
			[field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
		});
	};

	const handleSubmit = async (ev: React.FormEvent) => {
		ev.preventDefault();
		const { username, password } = formState;
		if (!username || !password) {
			setError("Username and password are required.");
			return;
		}
		setLoading(true);
		try {
			const response = await authenticate(username, password);
			console.log(response);

			if (response.responseBody.token != null) onClose();
			// Handle successful login here
		} catch (err) {
			setError("Login failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.loginForm}>
			<div className={styles.loginHeader}>
				<h2>Log In</h2>
			</div>

			{error && <div className={styles.error}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.inputGroup}>
					<label>Username :</label>
					<input
						type="text"
						value={formState.username}
						onChange={(e) => handleChange(e, "username")}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Password :</label>
					<input
						type="password"
						value={formState.password}
						onChange={(e) => handleChange(e, "password")}
						required
					/>
				</div>
				<div className={styles.checkboxGroup}>
					<label>
						<input
							type="checkbox"
							checked={formState.rememberMe}
							onChange={(e) => handleChange(e, "rememberMe")}
						/>
						Remember Me
					</label>
					<label>
						<input
							type="checkbox"
							checked={formState.stayLoggedIn}
							onChange={(e) => handleChange(e, "stayLoggedIn")}
						/>
						Stay Logged In
					</label>
				</div>
				<div className={styles.buttonGroup}>
					<button type="submit" disabled={loading} className={styles.submitButton}>
						{loading ? "Logging in..." : "Log In"}
					</button>
					<button type="button" onClick={onClose} className={styles.cancelButton}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginComponent;
