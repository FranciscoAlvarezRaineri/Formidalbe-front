import { createElement } from "react";

// Importar Utils:
import { getCardBody } from "./utils";

// specify the inputs required for any type of object
export default function GeneralParameterInputs({
  category,
  parameters,
  onChange,
  mods,
  allFormInputs,
}) {
  const CardBody = getCardBody(category, allFormInputs);
  return createElement(
    "div",
    null,
    createElement(CardBody, {
      parameters: parameters,
      onChange: onChange,
      mods: mods || {},
    })
  );
}
