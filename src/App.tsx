import { useState } from "react";
import "./App.css";
import Login from "./components/auth/Login/Login";
import Container from "./components/home/Container/Container";
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";
import Popup from "./components/generics/Popup/Popup";

function App() {
	const [showLogin, setShowLogin] = useState<boolean>(false);

	const handleShowLogin = () => {
		setShowLogin(true);
	};
	const handleCloseLogin = () => {
		setShowLogin(false);
	};

	return (
		<div className="mainContainer">
			<Header onClickLogin={handleShowLogin} />
			<div className="content-wrapper">
				{" "}
				{/* Add wrapper div */}
				<div className="transition-layer"></div>
				{showLogin && (
					<Popup onClose={handleCloseLogin}>
						<Login onClose={handleCloseLogin} />
					</Popup>
				)}
				<Container />
			</div>
			<Footer />
		</div>
	);
}

export default App;
