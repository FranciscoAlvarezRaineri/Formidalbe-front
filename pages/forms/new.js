// Similar a forms/[formID]/manage salvo que sin el botón de eliminar.
// Al crearlo se debe guardar el form en el back end.
import { useState, useEffect } from "react";
import axios from "../../axios";
import Router from "next/router";

import Form from "@rjsf/material-ui";
import validator from "@rjsf/validator-ajv8";
import Editor from "@monaco-editor/react";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PlayCircleFilledWhiteTwoTone } from "@material-ui/icons";

export default function NewForm() {
  const [schema, setSchema] = useState({});
  const [uischema, setUischema] = useState({});
  const [newSchema, setNewSchema] = useState({});
  const [newuischema, setNewUischema] = useState({});

  function createForm() {
    axios
      .post("/forms/create", {
        schema,
        uischema,
        answers: [1, 2],
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
          properties: {
            Polvo: {
              type: "boolean",
              title: "Polvo",
            },
            Ruido: {
              type: "boolean",
              title: "Ruido",
            },
          },
        },
        "Condiciones generales obligatorias": {
          type: "object",
          title: "Condiciones generales obligatorias",
          "-required": [
            "Respetar procedimiento de circulación para contratistas",
            "Colocar vallados y sectorizar el área de trabajo",
            "Indumentaria en buenas condiciones de limpieza",
            "Indumentaria acorde a la tarea a realizar",
            "Retiro de materiales al final de la jornada",
          ],
          properties: {
            "Indumentaria acorde a la tarea a realizar": {
              type: "boolean",
              title: "¿Tiene indumentaria acorde a la tarea?",
            },
            "Retiro de materiales al final de la jornada": {
              type: "boolean",
              title: "Se retiraron los materiales al final de la jornada",
            },
            "Indumentaria en buenas condiciones de limpieza": {
              type: "boolean",
              title: "Tiene indumentaria en buenas condiciones de limpieza",
            },
            "Colocar vallados y sectorizar el área de trabajo": {
              type: "boolean",
              title:
                "Se colocaron los vallados y se sectorizo el área de trabajo",
            },
            "Respetar procedimiento de circulación para contratistas": {
              type: "boolean",
              title:
                "Se ha respetado el procedimiento de circulación libre para contratistas",
            },
          },
        },
        "Elementos de protección personal necesarios para la tarea": {
          type: "object",
          title: "Elementos de protección personal necesarios para la tarea",
          "-required": [
            "Casco",
            "Anteojos de seguridad",
            "Arnés de seguridad",
            "Máscara facial",
            "Delantal",
            "Protector auditivo",
            "Guantes",
            "Otros",
          ],
          properties: {
            epps: {
              type: "array",
              items: {
                enum: [
                  "Casco",
                  "Anteojos de seguridad",
                  "Arnés de seguridad",
                  "Máscara facial",
                  "Delantal",
                  "Protector auditivo",
                  "Guantes",
                  "Calzado",
                ],
                type: "string",
              },
              title: "Seleccione los EPPS necesarios",
              uniqueItems: true,
            },
          },
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
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid item lg={6} md={12}>
        <>
          <h3>Schema:</h3>
          <Paper className={classes.item}>
            <Editor
              height="500px"
              width="600px"
              language="json"
              defaultValue={JSON.stringify(schema, null, 2)}
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
              defaultValue={JSON.stringify(uischema, null, 2)}
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
      <Grid item lg={6} md={12}>
        <Paper className={classes.item}>
          <Form
            schema={schema}
            uiSchema={uischema}
            validator={validator}
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
    </Grid>
  );
}
