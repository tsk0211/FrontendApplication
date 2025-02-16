import { useForm } from "react-hook-form";
import { TextField, Box, Typography, Button } from "@mui/material";
import { isValidEmail } from "../../utils/validators";
import { LoginFormValues } from "../../types/auth";

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: (data: LoginFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          validate: isValidEmail,
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Minimum 8 characters" },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );
}
