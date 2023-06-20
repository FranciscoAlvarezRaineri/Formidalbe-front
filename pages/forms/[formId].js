import Form from "@rjsf/material-ui/v4";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/styles";

import axios from "../../axios";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

export default function OneForm() {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState(null);
  const [form, setForm] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const getForm = async function () {
      const response = await axios.get(`forms/${router.query.formId}`, {
        withCredentials: true,
      });
      const form = response.data;
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

      return setForm(form);
    };

    getForm();
  }, [router.isReady]);

  function handleSubmit(formData) {
    axios.post("responses/create", { formData, form: form._id });
    setOpen(true);
    setDisable(true);
    setData(formData);
  }
  const useStyles = makeStyles((theme) => ({
    fondo: {
      background: "#f5fafd",
    },
    dialog: {
      color: "green",
      margin: "0 auto",
      display: "flex",
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth={"sm"} className={"classes.fondo"}>
      <Paper elevation={3}>
        {form ? (
          <Form
            schema={form.schema}
            uiSchema={form.uischema}
            formData={data ? data : null}
            disabled={disable}
            onSubmit={({ formData }) =>
              disable ? null : handleSubmit(formData)
            }
          />
        ) : null}
      </Paper>
      <Dialog open={open} onClick={() => setOpen(false)}>
        <DialogTitle className={classes.dialog}>Fromulario enviado</DialogTitle>
        <DialogContent>
          {" "}
          {`Se envió el formulario ${form?.title || form?._id} `}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
