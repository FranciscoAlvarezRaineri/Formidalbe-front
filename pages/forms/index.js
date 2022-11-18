// Listado de los forms (pueden usar el Table de MUI).
// Columnas posibles: “nombre”, “cant. de respuestas”, “fecha de creación”.
// Al clickear en una fila redirigir a /forms/[formID]/manage.

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const columns = [
  { id: "_id", label: "Nombre", minWidth: 100, align: "left" },
  { id: "createdAt", label: "Fecha de Creación", minWidth: 100, align: "left" },
  {
    id: "answers",
    label: "Respuestas",
    minWidth: 30,
    align: "right",
  },
];

export default function FormsTable() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("/forms")
      .then((res) => {
        console.log(res.data);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  <TableCell key="createdAt" align="center">
                    Fecha de Creación
                  </TableCell>
                  <TableCell key="answers" align="right">
                    Respuestas
                  </TableCell>
                </>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {
                      <>
                        <TableCell key="_id" align="left">
                          <Link href={`/forms/${row._id}`}>
                            {row.schema?.title || row._id}
                          </Link>
                        </TableCell>
                        <TableCell key="createdAt" align="center">
                          {row.createdAt?.split("T")[0]}
                        </TableCell>
                        <TableCell key="answers" align="right">
                          {row.answers?.length}
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
