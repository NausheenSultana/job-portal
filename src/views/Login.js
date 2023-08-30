import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import employees from "../data/freelancers.json";
import job_posters from "../data/employers.json";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const [user, setUser] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const submitLogin = (event) => {
    event.preventDefault();

    let found;
    let path = "";

    if (user.id.substr(0, 3).match("pid") === null) {
      path = `/search/${user.id}`;
      found = employees.find((element) => element.employee_id === user.id);
    } else {
      path = `/post-job/${user.id}`;
      found = job_posters.find((element) => element.pid === user.id);
    }
    if (
      user.id === "" ||
      user.id === null ||
      user.id === 0 ||
      user.password === "" ||
      user.password === null ||
      user.password === 0
    ) {
      return false;
    } else if (found === undefined || found.password !== user.password) {
      alert(
        "Please enter the correct ID and password or sign up if you don't have an account with us"
      );
    } else navigate(`${path}`);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container data-testid="container" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
             <LockOutlinedIcon /> 
          </Avatar> */}
          <PersonSearchIcon style={{ width: "100px", height: "100px" }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={submitLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              data-testid="uid"
              margin="normal"
              required
              fullWidth
              id="id"
              label="User ID"
              name="id"
              autoComplete="ID"
              onChange={(e) => setUser({ ...user, id: e.target.value })}
              autoFocus
              error={
                user.id === "" || user.id === null || user.id === 0
                  ? true
                  : false
              } //this will show err message only when there is error
              helperText="Please enter your ID"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              data-testid="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              autoComplete="current-password"
              error={
                user.password === "" ||
                user.password === null ||
                user.password === 0
                  ? true
                  : false
              } //this will show err message only when there is error
              helperText="Please enter your password"
            />

            <Button
              data-testid="submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
