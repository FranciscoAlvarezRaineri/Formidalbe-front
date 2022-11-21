// Similar a forms/[formID]/manage salvo que sin el botón de eliminar.
// Al crearlo se debe guardar el form en el back end.
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Router from "next/router";
/*import {
  FormBuilder,
  PredefinedGallery,
} from "../../react-json-schema-form-builder/dist";*/

import Form from "@rjsf/material-ui";

import Editor from "@monaco-editor/react";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";

//import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder'

const FormBuilder = dynamic(
  () => import("../../react-json-schema-form-builder/dist"),
  {
    ssr: false,
  }
);

export default function NewForm() {
  const [schema, setSchema] = useState({});
  const [uischema, setUischema] = useState({});

  function createForm() {
    axios
      .post("/forms/create", {
        schema,
        uischema,
        answers: [],
      })
      .then(() => {
        Router.push("/forms");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setUischema({
      "ui:order": [
        "Condiciones generales obligatorias",
        "Elementos de protección personal necesarios para la tarea",
        "Riesgos aplicados",
      ],
    });
    setSchema({
      type: "object",
      title: "Permiso de Trabajo General",
      properties: {
        "Riesgos aplicados": {
          type: "object",
          title: "Riesgos aplicables al trabajo a realizar.",
        },
        "Condiciones generales obligatorias": {
          type: "object",
          title: "Condiciones generales obligatorias",
        },
        "Elementos de protección personal necesarios para la tarea": {
          type: "object",
          title: "Elementos de protección personal necesarios para la tarea",
        },
      },
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    item: {
      borderRadius: "2px",
      borderStyle: "ridge",
      margin: "25px",
    },
    backButton: {
      type: "button",
      margin: "10px",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={3}
      >
        <FormBuilder
          schema={JSON.stringify(schema)}
          uischema={JSON.stringify(uischema)}
          onChange={(newSchema, newUiSchema) => {
            setSchema(JSON.parse(newSchema));
            setUischema(JSON.parse(newUiSchema));
          }}
        />
        {/* <PredefinedGallery
          schema={JSON.stringify(schema)}
          uischema={JSON.stringify(uischema)}
          onChange={(newSchema, newUiSchema) => {
            setSchema(JSON.parse(newSchema));
            setUischema(JSON.parse(newUiSchema));
          }}
        /> */}
        <Grid item lg={6} md={12}>
          <>
            <h3>Schema:</h3>
            <Paper className={classes.item}>
              <Editor
                height="500px"
                width="600px"
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
                width="600px"
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
        {/*<Grid item lg={6} md={12}>
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
        </Grid> */}
      </Grid>
    </>
  );
}
