import Form from "@rjsf/material-ui";
import { Button, Grid, Paper } from "@material-ui/core";
import axios from "../../axios";

export async function getServerSideProps(context) {
  const response = await axios.get(`/forms/${context.params.formId}`);
  const form = response.data;
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
      <Grid container justifyContent="center">
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = "/forms";
          }}
        >
          Volver
        </Button>
      </Grid>
      <Paper>
        <Form
          schema={form.schema}
          onSubmit={({ formData }) => handleSubmit(formData)}
        />
      </Paper>
      <Button></Button>
    </>
  );
}
