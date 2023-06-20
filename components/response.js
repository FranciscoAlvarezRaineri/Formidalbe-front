import Form from "@rjsf/material-ui/v4";
import { Container, Dialog, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import axios from "../axios";
import { useEffect, useState } from "react";

export default function Response({ _id }) {
  console.log(_id);
  const [response, setResponse] = useState({});

  useEffect(() => {
    axios.get(`/responses/${_id}`).then((res) => {
      setResponse(res.data);
    });
  }, []);

  return (
    <Container maxWidth={"sm"}>
      <Paper elevation={3}>
        {response.form ? (
          <Form
            schema={response.form?.schema}
            uiSchema={response.form?.uischema}
            formData={response.formData}
            disabled
            children={true}
          />
        ) : null}
      </Paper>
    </Container>
  );
}
