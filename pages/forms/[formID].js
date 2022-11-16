import fakeForms from "../../utils/fakeForms.js";
import Form from "@rjsf/material-ui";
import validator from "@rjsf/validator-ajv8";
import { Button, Grid } from "@material-ui/core";

export async function getStaticPaths() {
  const paths = fakeForms().map(({ formID }) => ({
    params: {
      formID,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const form = fakeForms().filter((form) => form.formID === params.formID)[0];
  console.log(form);
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
