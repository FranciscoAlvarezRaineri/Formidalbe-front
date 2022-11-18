import Form from "@rjsf/material-ui";
import { Button, Grid, Paper } from "@material-ui/core";
import axios from "../../axios";

export async function getServerSideProps(context) {
  const response = await axios.get(`/forms/form/${context.params._id}`);
  /* const form = fakeForms().filter(
    (form) => form.formID === context.params.formID
  )[0];*/
  const form = response.data;
  return {
    props: { form },
  };
}

export default function oneForm({ form }) {
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
        <Form schema={form.schema} />
      </Paper>
      <Button></Button>
    </>
  );
}
