// Listado de los forms (pueden usar el Table de MUI).
// Columnas posibles: “nombre”, “cant. de respuestas”, “fecha de creación”.
// Al clickear en una fila redirigir a /forms/[formID]/manage.

import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "../../axios";

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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Delete from "@material-ui/icons/Delete";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Share from "@material-ui/icons/Share";
import Edit from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";

export default function FormsTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const [selectedIndex, setSelectedIndex] = React.useState("");

  const handleOpenClose = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  useEffect(() => {
    axios
      .get("/forms")
      .then((res) => {
        console.log(res);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          color="primary"
          className={classes.submit}
          onClick={() => {
            window.location.href = "/forms/new";
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
                    {
                      <>
                        <TableCell key={form._id} align="left">
                          {form.schema?.title || form._id}
                        </TableCell>
                        <TableCell key="answers" align="right">
                          <div onClick={() => handleOpenClose(index)}>
                            {index === selectedIndex ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                            <Collapse in={index === selectedIndex}>
                              <List id={`res-${form._id}`}>
                                {form.responses?.map((response) => {
                                  return (
                                    <ListItem key={response._id}>
                                      {response.formData["Datos Personales"]
                                        ?.nombre || response._id}
                                    </ListItem>
                                  );
                                })}
                              </List>
                            </Collapse>
                          </div>
                        </TableCell>
                        <TableCell key="createdAt" align="center">
                          {form.createdAt?.split("T")[0]}
                        </TableCell>
                        <TableCell key="share" align="right">
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
                        <TableCell key="edit" align="right">
                          <Button
                            onClick={() => {
                              Router.push(`/forms/${form._id}/manage`);
                            }}
                          >
                            <Edit />
                          </Button>
                        </TableCell>
                        <TableCell key="remove" align="right">
                          <Button
                            onClick={() => {
                              handleDelete(form._id);
                            }}
                          >
                            <Delete />
                          </Button>
                        </TableCell>
                      </>
                    }
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
  },
}));
