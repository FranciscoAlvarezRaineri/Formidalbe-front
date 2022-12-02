// Listado de los forms (pueden usar el Table de MUI).
// Columnas posibles: “nombre”, “cant. de respuestas”, “fecha de creación”.
// Al clickear en una fila redirigir a /forms/[formID]/manage.

import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "../../axios";

import { parseCookies } from "./helpers/index"


import {
  Grid,
  Button,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Typography,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Dialog from "@material-ui/core/Dialog";

import Delete from "@material-ui/icons/Delete";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Share from "@material-ui/icons/Share";
import Edit from "@material-ui/icons/Edit";
import FileCopy from "@material-ui/icons/FileCopy";

import { makeStyles } from "@material-ui/core/styles";
import Response from "../../components/response";
import { getLocationOrigin } from "next/dist/next-server/lib/utils";

export default function FormsTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedPopUp, setSelectedPopUp] = useState("");

  useEffect(() => {
    axios
      .get("/forms")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOpenClose = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  const handlePopUp = (index) => {
    if (selectedPopUp === index) {
      setSelectedPopUp("");
    } else {
      setSelectedPopUp(index);
    }
  };

  function handleDuplicate(form) {
    axios
      .post("/forms/create", {
        schema: { ...form.schema, title: `Copia de ${form.schema.title}` },
        uischema: form.uischema,
      })
      .then(() => {
        axios.get("/forms").then((res) => {
          setRows(res.data);
        });
      })
      .catch((err) => console.log(err));
  }

  function handleDelete(_id) {
    axios
      .delete(`/forms/${_id}`)
      .then(() => {
        axios.get("/forms").then((res) => {
          setRows(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
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
        {/* <Typography>Usuario</Typography> */}
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
                  <TableCell key="answers" align="right">
                    Respuestas
                  </TableCell>
                  <TableCell key="createdAt" align="center">
                    Fecha de Creación
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
              .map((form, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={form._id}>
                    <TableCell key={`title_${form._id}`} align="left">
                      {form.schema?.title || form._id}
                    </TableCell>
                    <TableCell key={`answers_${form._id}`} align="right">
                      <div onClick={() => handleOpenClose(index)}>
                        {index === selectedIndex ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </div>
                      <Collapse in={index === selectedIndex}>
                        <List id={`res-${form._id}`}>
                          {form.responses?.map((response, j) => {
                            return (
                              <ListItem key={response._id}>

                                <Button
                                  onClick={() => handlePopUp(`${index}.${j}`)}
                                >
                                  {response.formData["Datos Personales"]
                                    ?.nombre || response._id}

                                </Button>
                                <Dialog
                                  open={`${index}.${j}` === selectedPopUp}
                                >
                                  <Response _id={response._id}></Response>
                                  <Button onClick={() => handlePopUp("")}>
                                    Salir
                                  </Button>
                                </Dialog>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Collapse>
                    </TableCell>
                    <TableCell key={`createdAt_${form._id}`} align="center">
                      {form.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell key={`share_${form._id}`} align="right">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `http://localhost:3000/forms/${form._id}`
                          );
                        }}
                      >
                        <Share />
                      </Button>
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
                      <Button
                        onClick={() => {
                          handleDelete(form._id);
                        }}
                      >
                        <Delete />
                      </Button>
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
  );
}

const useStyles = makeStyles((theme) => ({
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
  },
}));


// funcion para checkear si esta logueado el user
FormsTable.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);


  console.log(Object.keys(data)[0]);

if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }

  return {
    data: data && data
  }
}



