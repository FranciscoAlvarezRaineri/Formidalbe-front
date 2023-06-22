import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "../axios";
import Router from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

export default function SignUpp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);

    try {
      const newUser = await axios.post("/users/create", {
        email,
        password,
        name,
      });
      if (newUser) {
        setMessage("Usuario creado exitosamente!");
        setDone(true);
        setSuccess(true);
      }
    } catch (err) {
      setMessage(`${err.message ? err.message : null}.`);
      setDone(true);
      setSuccess(false);
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
          Crear nuevo usuario
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Crear
          </Button>
        </form>
        <Link href="/login" variant="body2">
          Ya tenes cuenta? Iniciar sesion aqui
        </Link>
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {done ? (
          <>
            {success ? (
              <>
                <DialogTitle>
                  <Typography variant="h5">{message}</Typography>
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => Router.push("/login")}
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </DialogActions>
              </>
            ) : (
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
            )}
          </>
        ) : (
          <DialogContent>
            <Box m={5}>
              <CircularProgress />
            </Box>
          </DialogContent>
        )}
      </Dialog>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
