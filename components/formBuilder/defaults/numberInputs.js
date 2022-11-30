import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { useState, createElement, Fragment } from "react";

// Importar componentes:
import FBCheckbox from "../checkbox/FBCheckbox";
import Example from "../Tooltip";

// Importar Utils:
import { getRandomId } from "../utils";

// specify the inputs required for a number type object
function CardNumberParameterInputs({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  return createElement(
    Container,
    null,
    createElement(
      Typography,
      { variant: "h5" },
      null,
      "Múltiplo de",
      " ",
      createElement(Example, {
        id: `${elementId}_multiple`,
        type: "help",
        text: "El número requerido debe ser un multiplo de este número",
      })
    ),
    createElement(Input, {
      value: parameters.multipleOf ? parameters.multipleOf : "",
      placeholder: "ej: 2",
      key: "multipleOf",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        onChange({ ...parameters, multipleOf: newVal });
      },
      className: "card-modal-number",
    }),
    createElement(Typography, { variant: "h5" }, null, "Minimo"),
    createElement(Input, {
      value: parameters.minimum || parameters.exclusiveMinimum || "",
      placeholder: "ej: 3",
      key: "minimum",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        // change either min or exclusiveMin depending on which one is active
        if (parameters.exclusiveMinimum) {
          onChange({ ...parameters, exclusiveMinimum: newVal, minimum: null });
        } else {
          onChange({ ...parameters, minimum: newVal, exclusiveMinimum: null });
        }
      },
      className: "card-modal-number",
    }),
    createElement(
      Container,
      {
        className: "card-modal-boolean",
      },
      createElement(FBCheckbox, {
        key: "exclusiveMinimum",
        onChangeValue: () => {
          const newMin = parameters.minimum || parameters.exclusiveMinimum;
          if (parameters.exclusiveMinimum) {
            onChange({
              ...parameters,
              exclusiveMinimum: null,
              minimum: newMin,
            });
          } else {
            onChange({
              ...parameters,
              exclusiveMinimum: newMin,
              minimum: null,
            });
          }
        },
        isChecked: !!parameters.exclusiveMinimum,
        disabled: !parameters.minimum && !parameters.exclusiveMinimum,
        label: "Minimo Exclusivo",
      })
    ),
    createElement(Typography, { variant: "h5" }, null, "Máximo"),
    createElement(Input, {
      value: parameters.maximum || parameters.exclusiveMaximum || "",
      placeholder: "ej: 8",
      key: "maximum",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        // change either max or exclusiveMax depending on which one is active
        if (parameters.exclusiveMinimum) {
          onChange({ ...parameters, exclusiveMaximum: newVal, maximum: null });
        } else {
          onChange({ ...parameters, maximum: newVal, exclusiveMaximum: null });
        }
      },
      className: "card-modal-number",
    }),
    createElement(
      Container,
      {
        className: "card-modal-boolean",
      },
      createElement(FBCheckbox, {
        key: "exclusiveMaximum",
        onChangeValue: () => {
          const newMax = parameters.maximum || parameters.exclusiveMaximum;
          if (parameters.exclusiveMaximum) {
            onChange({
              ...parameters,
              exclusiveMaximum: null,
              maximum: newMax,
            });
          } else {
            onChange({
              ...parameters,
              exclusiveMaximum: newMax,
              maximum: null,
            });
          }
        },
        isChecked: !!parameters.exclusiveMaximum,
        disabled: !parameters.maximum && !parameters.exclusiveMaximum,
        label: "Máximo Exclusivo",
      })
    )
  );
}

function NumberField({ parameters, onChange }) {
  return createElement(
    Fragment,
    null,
    createElement(Typography, { variant: "h5" }, null, "Número por defecto"),
    createElement(Input, {
      value: parameters.default,
      id: "standard-secondary",
      required: true,
      color: "primary",
      label: "Standard secondary",
      placeholder: "Número por defecto",
      type: "number",
      onChange: (ev) =>
        onChange({ ...parameters, default: parseFloat(ev.target.value) }),
      className: "card-number",
    })
  );
}

const numberInputs = {
  integer: {
    displayName: "Número Entero",
    matchIf: [
      {
        types: ["integer"],
      },
      {
        types: ["integer"],
        widget: "number",
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "integer",
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs,
  },
  number: {
    displayName: "Número",
    matchIf: [
      {
        types: ["number"],
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "number",
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs,
  },
};

export default numberInputs;
