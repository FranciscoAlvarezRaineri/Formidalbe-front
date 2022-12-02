// Similar a forms/[formID]/manage salvo que sin el botón de eliminar.
// Al crearlo se debe guardar el form en el back end.
import React, { useState } from "react";
import axios from "../../../axios";
import Router from "next/router";

import Form from "@rjsf/material-ui";
import Editor from "@monaco-editor/react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";



const FormBuilder = dynamic(
  () => import("../../../components/formBuilder/FormBuilder"),
  {
    ssr: false,
  }
);

export async function getServerSideProps(context) {
  const response = await axios.get(`/forms/${context.params.formId}`);
  const form = response.data;
  return {
    props: { form },
  };
}

export default function EditForm({ form }) {
  const [schema, setSchema] = useState(form.schema);
  const [uischema, setUischema] = useState(form.uischema);

  function saveForm() {
    axios
      .put(`/forms/${form._id}`, {
        schema,
        uischema,
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
      margin: "10px",
    },
  }));
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-evenly" spacing={3}>
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
            saveForm();
          }}
        >
          Guardar Cambios
        </Button>
      </Grid>
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
    </Grid>
  );
}

