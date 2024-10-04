import { useState, useEffect, FormEvent } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { confirmSignIn } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const handleNewPassword = async (newPassword: string): Promise<void> => {
  try {
    console.log(newPassword);
    await confirmSignIn({
      challengeResponse: newPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error setting new password:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

function navSignIn(navigate: (path: string) => void) {
  navigate("/");
}

const ConfirmationPage = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [isPasswordSet, setIsPasswordSet] = useState<boolean>(false);
  const navigate = useNavigate();

  // Regular expression for password validation
  const passwordRegex = /^(?=.*\d)[A-Za-z\d]{10,}$/;

  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    // Validate the password using the regex
    if (!passwordRegex.test(password)) {
      setError("Password must be with minimum 10 characters long and contain at least one number.");
      return;
    }

    try {
      await handleNewPassword(password);
      setIsPasswordSet(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to set new password");
      } else {
        setError("Failed to set new password");
      }
    }
  };

  useEffect(() => {
    if (isPasswordSet) {
      navSignIn(navigate); // Call navSignIn once the password is set
    }
  }, [isPasswordSet, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "#005858", marginBottom: 2 }}
        >
          Confirm Your Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!passwordRegex.test(password)}
            helperText={
              !passwordRegex.test(password)
                ? "Password must be exactly 10 characters long and contain at least one number."
                : ""
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!passwordsMatch && confirmPassword.length > 0}
            helperText={
              !passwordsMatch && confirmPassword.length > 0
                ? "Passwords do not match"
                : ""
            }
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#005858",
              "&:hover": {
                backgroundColor: "#004d4d",
              },
            }}
            disabled={!passwordsMatch || !password || !confirmPassword || !passwordRegex.test(password)}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmationPage;
