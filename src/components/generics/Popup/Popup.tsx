import React from "react";
import styles from "./Popup.module.css";

interface PopupProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
	return (
		<div className={styles.overlay}>
			<div className={styles.popup}>
				<button className={styles.closeButton} onClick={onClose}></button>
				{children}
			</div>
		</div>
	);
};

export default Popup;
