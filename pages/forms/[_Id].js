import Form from "@rjsf/material-ui";
import { Button, Grid, Paper } from "@material-ui/core";
import axios from "../../axios";

export async function getServerSideProps(context) {
  console.log("context", context.params._Id);
  const response = await axios.get(`/forms/${context.params._Id}`);
  console.log(response);
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
