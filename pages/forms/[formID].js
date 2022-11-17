import fakeForms from "../../utils/fakeForms.js";
import Form from "@rjsf/material-ui";
import validator from "@rjsf/validator-ajv8";
import { Button, Grid } from "@material-ui/core";
import axios from "../../axios";

export async function getServerSideProps(context) {
  // const form = await axios.get(`/forms/${context.params.formID}`)
  const form = fakeForms().filter(
    (form) => form.formID === context.params.formID
  )[0];
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
      <Form schema={form.schema} validator={validator} />
      <Button></Button>
    </>
  );
}
