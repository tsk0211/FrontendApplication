// Login.tsx

import React, { useState } from "react";
import LoginComponent from "./LoginComponent/LoginComponent";
import RegisterComponent from "../Register/RegisterComponent";
import styles from "./Login.module.css";

interface LoginProps {
	onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
	const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

	const toggleMode = () => {
		setIsLoginMode(!isLoginMode);
	};

	return (
		<div className={styles.loginForm}>
			{isLoginMode ? <LoginComponent onClose={onClose} /> : <RegisterComponent onClose={onClose} />}

			<div className={styles.toggleLinks}>
				{isLoginMode ? (
					<div>
						Need an account?
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault();
								toggleMode();
							}}
							className={styles.signInLink}
						>
							{" "}
							Sign up
						</a>
					</div>
				) : (
					<div>
						Already have an account?
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault();
								toggleMode();
							}}
							className={styles.loginLink}
						>
							{" "}
							Log in
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
