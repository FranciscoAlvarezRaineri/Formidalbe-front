// Listado de los forms (pueden usar el Table de MUI).
// Columnas posibles: “nombre”, “cant. de respuestas”, “fecha de creación”.
// Al clickear en una fila redirigir a /forms/[formID]/manage.

import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "../../axios";
import { useCookies } from "react-cookie";
import { parseCookies } from "./helpers/index";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Alert from "@material-ui/lab/Alert";
import { DialogTitle, DialogContent } from "@material-ui/core";

import Delete from "@material-ui/icons/Delete";
import Share from "@material-ui/icons/Share";
import Edit from "@material-ui/icons/Edit";
import FileCopy from "@material-ui/icons/FileCopy";
import ListIcon from "@material-ui/icons/List";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { makeStyles } from "@material-ui/core/styles";

export default function FormsTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  //const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedDeletePopUp, setSelectedDeletePopUp] = useState("");
  const [selectedSharePopUp, setSelectedSharePopUp] = useState("");
  const [anchorEl, setAnchorEl] = useState({});
  const [email, setEmail] = useState("");

  const [selectedExpand, setSelectedExpand] = useState("");

  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    axios
      .get(`/forms/users/${cookies.token.id}`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDuplicate(form) {
    console.log(form);
    axios
      .post("/forms/create", {
        schema: { ...form.schema, title: `Copia de ${form.title}` },
        uischema: form.uischema,
        user: cookies.token.id,
      })
      .then(() => {
        axios.get("/forms").then((res) => {
          setRows(res.data);
        });
      })
      .catch((err) => console.log(err));
  }

  function handleSharePopUp(i) {
    if (selectedSharePopUp === i) {
      setSelectedSharePopUp("");
    } else {
      setSelectedSharePopUp(i);
    }
  }

  function handleDeletePopUp(i) {
    if (selectedDeletePopUp === i) {
      setSelectedDeletePopUp("");
    } else {
      setSelectedDeletePopUp(i);
    }
  }

  function handleDelete(_id) {
    axios
      .delete(`/forms/${_id}`)
      .then(() => {
        axios.get(`/forms/users/${cookies.token.id}`).then((res) => {
          setRows(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEmail(form) {
    axios
      .put(`/responses/share`, {
        email,
        formUrl: `http://localhost:3000/forms/${form._id}`,
        formTitle: form.title,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleExpand(i) {
    if (selectedExpand === i) {
      setSelectedExpand("");
    } else {
      setSelectedExpand(i);
    }
  }

  const handleClose=()=>{
    setSelectedSharePopUp(null)
  }

  return (
    <>
      <Hidden smDown>
        <Paper className={classes.root}>
          <Grid container justifyContent="center">
            <Button
              type="button"
              variant="contained"
              //color="#0097d1"
              className={classes.submit}
              onClick={() => {
                Router.push("/forms/new");
              }}
            >
              Nuevo Formulario
            </Button>
          </Grid>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  {
                    <>
                      <TableCell key="_id" align="left">
                        Formulario
                      </TableCell>
                      <TableCell key="createdAt" align="center">
                        Fecha de Creación
                      </TableCell>
                      <TableCell key="answers" align="right">
                        Respuestas
                      </TableCell>
                      <TableCell key="share" align="right">
                        Compartir
                      </TableCell>
                      <TableCell key="edit" align="right">
                        Editar
                      </TableCell>
                      <TableCell key="duplicate" align="right">
                        Duplicar
                      </TableCell>
                      <TableCell key="remove" align="right">
                        Eliminar
                      </TableCell>
                    </>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((form, i) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={form._id}
                      >
                        <TableCell key={`title_${form._id}`} align="left">
                          {form.title || form._id}
                        </TableCell>
                        <TableCell key={`createdAt_${form._id}`} align="center">
                          {form.createdAt?.split("T")[0]}
                        </TableCell>
                        <TableCell key={`answers_${form._id}`} align="right">
                          <Button
                            onClick={() => {
                              Router.push(`/forms/${form._id}/responses`);
                            }}
                          >
                            <ListIcon />
                          </Button>
                        </TableCell>
                        <TableCell key={`share_${form._id}`} align="right">
                          <Button
                            onClick={(e) => {
                              setAnchorEl(e.target);
                              handleSharePopUp(i);
                            }}
                          >
                            <Share />
                          </Button>
                          <Popover
                          open={i === selectedSharePopUp}
                          onClose = {handleClose}
                            anchorEl={anchorEl}
                          >
                            <Button
                            className={classes.submit}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `http://localhost:3000/forms/${form._id}`
                                );
                                handleSharePopUp("");
                              }}
                            >
                              Copiar al portapapeles
                            </Button>
                            <>
                              <Typography>Enviar al e-mail:</Typography>
                              <Input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                              ></Input>
                              <Button 
                               className={classes.submit1}
                              onClick={() => handleEmail(form)}>
                                ENVIAR
                              </Button>
                            </>
                          </Popover>
                        </TableCell>
                        <TableCell key={`edit_${form._id}`} align="right">
                          <Button
                            onClick={() => {
                              Router.push(`/forms/${form._id}/manage`);
                            }}
                          >
                            <Edit />
                          </Button>
                        </TableCell>
                        <TableCell key={`duplicate_${form._id}`} align="right">
                          <Button
                            onClick={() => {
                              handleDuplicate(form);
                            }}
                          >
                            <FileCopy />
                          </Button>
                        </TableCell>
                        <TableCell key={`remove_${form._id}`} align="right">
                          <Button onClick={() => handleDeletePopUp(i)}>
                            <Delete />
                          </Button>
                          <Dialog open={i === selectedDeletePopUp}>
                            <DialogTitle>{`Se eliminará el formulario ${
                              form.title || form._id
                            } `}</DialogTitle>
                            <DialogContent>{`Confirma que desea eliminar el Formulario ${
                              form.title || form._id
                            } `}</DialogContent>
                            <Button onClick={() => handleDelete(form._id)}>
                              Eliminar
                            </Button>
                            <Button onClick={() => handleDeletePopUp("")} color={"secondary"}>
                              Cancelar
                            </Button>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => {
              setPage(newPage);
            }}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Paper>
      </Hidden>
      <Hidden mdUp>
        <Button
              type="button"
              variant="contained"
              className={classes.submit2}
              onClick={() => {
                Router.push("/forms/new");
              }}
            >
              Nuevo Formulario
            </Button>
        <List>
          {rows.map((form, i) => (
            <ListItem key={i}>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>{form.title}</Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      form.responses ? (
                        Router.push(`/forms/${form._id}/responses`)
                      ) : (
                        <Alert>
                          {" "}
                          El formulario todavia no tiene respuestas.
                        </Alert>
                      );
                    }}
                  >
                    <ListIcon />
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={(e) => handleExpand(i)}>
                    <MoreVertIcon />
                  </Button>
                  <Dialog open={i === selectedExpand}>
                    <List>
                      <ListItem>
                        <Typography className={classes.title}>{`${form.title}`}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography className={classes.title}>{form.createdAt?.split("T")[0]}</Typography>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={(e) => {
                            setAnchorEl(e.target);
                            handleSharePopUp(i);
                          }}
                        >
                          <Share /> <Typography>Compartir</Typography>
                        </Button>
                        <Popover
                          open={i === selectedSharePopUp}
                          anchorEl={anchorEl}
                        >
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `http://localhost:3000/forms/${form._id}`
                              );
                              handleSharePopUp("");
                            }}
                          >
                            Copiar al portapapeles
                          </Button>
                          <>
                            <Typography>Enviar al e-mail:</Typography>
                            <Input
                              type="text"
                              onChange={(e) => setEmail(e.target.value)}
                            ></Input>
                            <Button onClick={() => handleEmail(form)}>
                              ENVIAR
                            </Button>
                          </>
                        </Popover>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => {
                            Router.push(`/forms/${form._id}/manage`);
                          }}
                        >
                          <Edit />
                          <Typography>editar </Typography>
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => {
                            handleDuplicate(form);
                          }}
                        >
                          <>
                            <FileCopy />
                            <Typography>copiar </Typography>
                          </>
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button onClick={() => handleDeletePopUp(i)}>
                          <Delete />
                          <Typography>eliminar</Typography>
                        </Button>
                        <Dialog open={i === selectedDeletePopUp}>
                          <DialogTitle className={classes.title} >{`Se eliminará el formulario ${
                            form.title || form._id
                          } `}</DialogTitle>
                          <Button
                            onClick={() => {
                              handleExpand("");
                              handleDeletePopUp("");
                              handleDelete(form._id);
                            }}
                          >
                            Eliminar
                          </Button>
                          <Button onClick={() => handleDeletePopUp("")}>
                            Cancelar
                          </Button>
                        </Dialog>
                      </ListItem>
                    </List>

                    <Button onClick={() => handleExpand("")} color={"secondary"}>Cancelar</Button>
                  </Dialog>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Hidden>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  title:{
    fontWeight: 'bold',
    display:"flex",
    margin:"0 auto",
  },
  root: {
    width: "100%",
  },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    minWidth: 250,
    backgroundColor: "#0097d1",
    "&:hover": {
      backgroundColor: "#BFDCF5",
      color: "black",
    },
    color: "white",
  },
  submit1: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#0097d1",
    "&:hover": {
      backgroundColor: "#BFDCF5",
      color: "black",
    },
    color: "white",
  },submit2: {
    margin: "0 auto",
    display:"flex",
    backgroundColor: "#0097d1",
    "&:hover": {
      backgroundColor: "#BFDCF5",
      color: "black",
    },
    color: "white",
    justifyContent: 'center'
  },
}));

// funcion para checkear si esta logueado el user
FormsTable.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  console.log(Object.keys(data)[0]);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};
