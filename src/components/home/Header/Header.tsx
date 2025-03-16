// src/components/Header.tsx
import React from "react";
import HomeConfig from "../../../config/HomeScreenGenericConfig.ts";
import styles from "./Header.module.css";

interface LoginProps {
	onClickLogin: () => void; // This will close the login form when the user clicks to cancel or after successful login
}
const Header: React.FC<LoginProps> = ({ onClickLogin }) => {
	const { title, logoIconPath } = HomeConfig;

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src={logoIconPath} alt="Logo" className={styles.logoImage} />
				<h1 className={styles.title}>{title}</h1>
			</div>
			<div className={styles.signIn}>
				<button onClick={onClickLogin} className={styles.signInButton}>
					Sign In
				</button>
			</div>
		</header>
	);
};

export default Header;
