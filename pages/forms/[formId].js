import Form from "@rjsf/material-ui";
import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import axios from "../../axios";
import { useState } from "react";

export async function getServerSideProps(context) {
  let form = await axios.get(`/forms/${context.params.formId}`);
  form = form.data;
  // Información adicional que requiere el formulario para pedir nombre e email.
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
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({});

  function handleSubmit(formData) {
    axios.post("responses/create", { formData, form: form._id });
    setOpen(true);
    setDisable(true);
    setData(formData);
  }

  return (
    <Container maxWidth={"sm"}>
      <Paper elevation={3}>
        <Form
          schema={form.schema}
          uiSchema={form.uischema}
          formData={data}
          disabled={disable}
          onSubmit={({ formData }) => (disable ? null : handleSubmit(formData))}
        />
      </Paper>
      <Dialog open={open} onClick={() => setOpen(false)}>
        <Card minWidth="300">
          <Typography variant={"h6"}>Fromulario enviado</Typography>
        </Card>
      </Dialog>
    </Container>
  );
}
