import React, { useState } from "react";
import Router from "next/router";

import axios from "../axios"; //importar axios del index de la carpeta axios, que contiene la instancia que hace referencia al back.

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#0097d1",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#0097d1",
    "&:hover": {
      backgroundColor: "#BFDCF5",
      color: "black",
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");

  const logIn = async (e) => {
    e.preventDefault();
    setOpen(true);

    try {
      const response = await axios.post(
        "/users/login",
        { email, password },
        { withCredentials: true }
      ); //handle API call to sign in here.
      if (response) {
        const data = response.data;
        setCookie("token", JSON.stringify(data), {
          path: "/",
          maxAge: 36000, // Expires after 10hr
          sameSite: true,
        });
        Router.push("/forms");
      }
    } catch (err) {
      setDone(true);
      setMessage(`${err.message ? err.message : null}.`);
    }
    return;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => logIn(e)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            onClick={(e) => logIn(e)}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Sesión
          </Button>
        </form>
        <Link href="/register" variant="body2">
          No tienes una cuenta? Registrarse aqui.
        </Link>
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {done ? (
          <>
            <DialogTitle>
              <Typography variant="h5" align="center">
                Hubo un problema.
              </Typography>
              <Typography variant="h5" align="center">
                {message}
              </Typography>
              <Typography variant="h5" align="center">
                Por favor, vuelve a intentarlo.
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Volver a intentar
              </Button>
            </DialogActions>
          </>
        ) : (
          <DialogContent>
            <Box m={5}>
              <CircularProgress />
            </Box>
          </DialogContent>
        )}
      </Dialog>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {" 2022"}
    </Typography>
  );
}
