// Similar a forms/[formID]/manage salvo que sin el botón de eliminar.
// Al crearlo se debe guardar el form en el back end.
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Router from "next/router";
import { useCookies } from "react-cookie";

import Form from "@rjsf/material-ui";
import Editor from "@monaco-editor/react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";

import { parseCookies } from "./helpers/index";

const FormBuilder = dynamic(
  () => import("../../components/formBuilder/FormBuilder"),
  {
    ssr: false,
  }
);

export default function NewForm() {
  const [schema, setSchema] = useState({});
  const [uischema, setUischema] = useState({});
  const [cookies] = useCookies(["token"]);

  function createForm() {
    axios
      .post("/forms/create", {
        schema,
        uischema,
        user: cookies.token.id,
      })
      .then(() => {
        Router.push("/forms");
      })
      .catch((err) => console.log(err));
  }

  const useStyles = makeStyles((theme) => ({
    item: {
      borderRadius: "2px",
      borderStyle: "ridge",
      margin: "25px",
    },
    backButton: {
      type: "button",
      margin: "0px",
      backgroundColor: "#0097d1",
    },
    fondo: {
      background: "#f5fafd",
    },
  }));
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="space-evenly"
      spacing={3}
      className={classes.fondo}
    >
      <Grid item lg={6} md={12}>
        <FormBuilder
          schema={JSON.stringify(schema)}
          uischema={JSON.stringify(uischema)}
          onChange={(newSchema, newUiSchema) => {
            setSchema(JSON.parse(newSchema));
            setUischema(JSON.parse(newUiSchema));
          }}
        />
        <Paper className={classes.item}>
          <Form
            schema={schema}
            uiSchema={uischema}
            children={true} // Evitar que se muestre el boton de Submit.
          />
        </Paper>
        <Button
          className={classes.backButton}
          variant="contained"
          color="primary"
          onClick={() => {
            createForm();
          }}
        >
          Crear Formulario
        </Button>
      </Grid>
      <Grid item lg={6} md={12}>
        <>
          <h3>Schema:</h3>
          <Paper className={classes.item}>
            <Editor
              height="500px"
              width="100%"
              language="json"
              value={JSON.stringify(schema, null, 2)}
              onChange={(e) => {
                setSchema(JSON.parse(e));
              }}
            />
          </Paper>
          <h3>UISchema:</h3>
          <Paper className={classes.item}>
            <Editor
              height="500px"
              width="100%"
              language="json"
              value={JSON.stringify(uischema, null, 2)}
              onChange={(e) => {
                setUischema(JSON.parse(e));
              }}
            />
          </Paper>
          <Button
            className={classes.backButton}
            variant="contained"
            color="primary"
            onClick={() => {
              Router.push("/forms");
            }}
          >
            Atras
          </Button>
        </>
      </Grid>
    </Grid>
  );
}

// funcion para checkear si esta logueado el user
NewForm.getInitialProps = async ({ req, res }) => {
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
