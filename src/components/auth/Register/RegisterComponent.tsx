import React, { useState } from "react";
import authenticate from "../../../api/Security/Auth/Auth";
import styles from "../Login/Login.module.css";

interface RegisterComponentProps {
	onClose: () => void;
}

interface FormState {
	fullName: string;
	username: string;
	email: string;
	description: string;
	password: string;
	confirmPassword: string;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ onClose }) => {
	const [formState, setFormState] = useState<FormState>({
		fullName: "",
		username: "",
		email: "",
		description: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormState) => {
		setFormState({
			...formState,
			[field]: e.target.value,
		});
	};

	const handleSubmit = async (ev: React.FormEvent) => {
		ev.preventDefault();
		const { fullName, username, email, password, confirmPassword } = formState;
		if (!fullName || !username || !email || !password || !confirmPassword) {
			setError("Full name, username, email, password, and confirm password are required.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true);
		try {
			const response = await authenticate(username, password); // Use your register API here
			console.log(response);
			debugger;
			if (response.responseBody.token != null) onClose();
			// Handle successful registration here
		} catch (err) {
			setError("Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.loginForm}>
			<div className={styles.loginHeader}>
				<h2>Sign Up</h2>
				<p className={styles.subtitle}>Create a new account</p>
			</div>

			{error && <div className={styles.error}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className={styles.formGrid}>
					<div className={styles.inputGroup}>
						<label>Full Name:</label>
						<input
							type="text"
							value={formState.fullName}
							onChange={(e) => handleChange(e, "fullName")}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>Username:</label>
						<input
							type="text"
							value={formState.username}
							onChange={(e) => handleChange(e, "username")}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>Email:</label>
						<input
							type="email"
							value={formState.email}
							onChange={(e) => handleChange(e, "email")}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>Description:</label>
						<input
							type="text"
							value={formState.description}
							onChange={(e) => handleChange(e, "description")}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>Password:</label>
						<input
							type="password"
							value={formState.password}
							onChange={(e) => handleChange(e, "password")}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>Confirm Password:</label>
						<input
							type="password"
							value={formState.confirmPassword}
							onChange={(e) => handleChange(e, "confirmPassword")}
							required
						/>
					</div>
				</div>
				<div className={styles.buttonGroup}>
					<button type="submit" disabled={loading} className={styles.submitButton}>
						{loading ? "Signing up..." : "Sign Up"}
					</button>
					<button type="button" onClick={onClose} className={styles.cancelButton}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterComponent;
