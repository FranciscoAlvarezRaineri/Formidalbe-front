import Form from "@rjsf/material-ui";
import { Button, Grid, Paper } from "@material-ui/core";
import axios from "../../axios";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const response = await axios.get(`/forms/${context.params.formId}`);
  const form = response.data;
  // Información adicional que requiere el formulario.
  form.schema.properties = {
    ...form.schema.properties,
    "Datos Personales": {
      title: "Datos Personales",
      type: "object",
      properties: {
        nombre: {
          title: "Nombre y Apellido",
          type: "string",
        },
        email: {
          title: "Email",
          type: "string",
          format: "email",
        },
      },
      dependencies: {},
      required: ["nombre"],
    },
  };
  form.uischema["ui:order"].unshift("Datos Personales");
  form.uischema = {
    ...form.uischema,
    "Datos Personales": {
      nombre: {
        "ui:autocomplete": "username",
      },
      email: {
        "ui:autocomplete": "email",
      },
      "ui:order": ["nombre", "email"],
    },
  };

  return {
    props: { form },
  };
}

export default function OneForm({ form }) {
  function handleSubmit(formData) {
    axios.post("responses/create", { formData, form_id: form._id });
  }

  return (
    <>
      <Grid container justifyContent="center"></Grid>
      <Paper>
        <Form
          schema={form.schema}
          uiSchema={form.uischema}
          onSubmit={({ formData }) => handleSubmit(formData)}
        />
      </Paper>
      <Button></Button>
    </>
  );
}
