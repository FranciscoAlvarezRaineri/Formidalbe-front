// Listado de los forms (pueden usar el Table de MUI).
// Columnas posibles: “nombre”, “cant. de respuestas”, “fecha de creación”.
// Al clickear en una fila redirigir a /forms/[formID]/manage.

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "../../axios";

import fakeForms from "../../utils/fakeForms";

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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const columns = [
  { id: "title", label: "Nombre", minWidth: 100 },
  { id: "date", label: "Fecha de Creación", minWidth: 100 },
  {
    id: "respuestas",
    label: "Respuestas",
    minWidth: 30,
    align: "right",
  },
];

//const rows = fakeForms();

export default function StickyHeadTable() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState(fakeForms());

  /*useEffect(() => {
    axios.get("/forms").then((res) => {
      setRows(res).catch((err) => {
        console.log(err);
      });
    });
  }, []);*/

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
      <Table className={classes.head}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <TableContainer>
        <Table>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "title" ? (
                            <Link href={`/forms/${row.formID}`}>{value}</Link>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
