import React from "react";
import clsx from "clsx";
import Link from "../src/Link";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "../axios";
import { useCookies } from "react-cookie";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LoginIcon from "@material-ui/icons/VpnKey";
import RegisterIcon from "@material-ui/icons/ContactMail";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import ViewListIcon from "@material-ui/icons/ViewList";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Container from "@material-ui/core/Container";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#0097d1",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#BFDCF5",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute ? true : false;
  };

  const routes = () => {
    if (!cookies.token) {
      return [
        {
          id: 2,
          label: "Iniciar sesión",
          path: "/login",
          icon: LoginIcon,
        },
        {
          id: 3,
          label: "Registrarse",
          path: "/register",
          icon: RegisterIcon,
        },
      ];
    } else {
      return [
        {
          id: 1,
          label: "Formularios",
          path: "/forms",
          icon: ViewListIcon,
        },
        {
          id: 4,
          label: "Nuevo Formulario",
          path: "/forms/new",
          icon: AddCircleIcon,
        },
      ];
    }
  };

  const options = routes();

  function logOut() {
    axios
      .get("/users/logout", { withCredentials: true })
      .then(() => {
        removeCookie("token");
        Router.push("/login");
      })
      .catch((error) => {
        alert("Error: No se pudo desloguear");
      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Creador de Formularios
          </Typography>
          {cookies.token ? (
            <>
              <PersonIcon style={{ color: "white", fontSize: 40 }} />
              <Typography variant="h5" color="action">
                {cookies.token.name}
              </Typography>
              &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                color="inherit"
                onClick={logOut}
                variant={"outlined"}
                style={{ background: "#0097d1", fontSize: 16 }}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            ""
            // <Button color="inherit" component={Link} href="/login">Iniciar Sesión</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {options.map((item, index) => (
            <Link
              href={item.path}
              style={{ textDecoration: "none", color: "black" }}
              key={index}
            >
              <MenuItem selected={activeRoute(item.path, router.pathname)}>
                <ListItem button key={index}>
                  <ListItemIcon>
                    {" "}
                    <item.icon />{" "}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </MenuItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Container maxWidth="xl">{props.mainPage}</Container>
      </main>
    </div>
  );
}
