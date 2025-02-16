import LoginForm from "../components/Auth/LoginForm";
import "../styles/login.css";
import { Typography } from "@mui/material";

export default function Login() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="login-page">
      <Typography variant="h3" className="welcome-text">
        Join Us and Stay Connected!
      </Typography>
      <div className="login-container">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
