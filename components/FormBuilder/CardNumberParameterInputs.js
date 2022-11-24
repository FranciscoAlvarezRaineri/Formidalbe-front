import Input from "@material-ui/core/Input";
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import React, { useState, createElement } from "react";

// Importar componentes:
import FBCheckbox from "./FBCheckbox";
import Example from "./Example";

// Importar Utils:
import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";

// specify the inputs required for a number type object
export default function CardNumberParameterInputs({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  return createElement(
    Container,
    null,
    createElement(
      Typography,{variant:"h4"},
      null,
      "Multiple of",
      " ",
      createElement(Example, {
        id: `${elementId}_multiple`,
        type: "help",
        text: "Require number to be a multiple of this number",
      })
    ),
    createElement(Input, {
      value: parameters.multipleOf ? parameters.multipleOf : "",
      placeholder: "ex: 2",
      key: "multipleOf",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        onChange(
          _extends({}, parameters, {
            multipleOf: newVal,
          })
        );
      },
      className: "card-modal-number",
    }),
    createElement(Typography,{variant:"h4"}, null, "Minimum"),
    createElement(Input, {
      value: parameters.minimum || parameters.exclusiveMinimum || "",
      placeholder: "ex: 3",
      key: "minimum",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        // change either min or exclusiveMin depending on which one is active
        if (parameters.exclusiveMinimum) {
          onChange(
            _extends({}, parameters, {
              exclusiveMinimum: newVal,
              minimum: null,
            })
          );
        } else {
          onChange(
            _extends({}, parameters, {
              minimum: newVal,
              exclusiveMinimum: null,
            })
          );
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
            onChange(
              _extends({}, parameters, {
                exclusiveMinimum: null,
                minimum: newMin,
              })
            );
          } else {
            onChange(
              _extends({}, parameters, {
                exclusiveMinimum: newMin,
                minimum: null,
              })
            );
          }
        },
        isChecked: !!parameters.exclusiveMinimum,
        disabled: !parameters.minimum && !parameters.exclusiveMinimum,
        label: "Exclusive Minimum",
      })
    ),
    createElement(Typography,{variant:"h4"}, null, "Maximum"),
    createElement(Input, {
      value: parameters.maximum || parameters.exclusiveMaximum || "",
      placeholder: "ex: 8",
      key: "maximum",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        // change either max or exclusiveMax depending on which one is active
        if (parameters.exclusiveMinimum) {
          onChange(
            _extends({}, parameters, {
              exclusiveMaximum: newVal,
              maximum: null,
            })
          );
        } else {
          onChange(
            _extends({}, parameters, {
              maximum: newVal,
              exclusiveMaximum: null,
            })
          );
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
            onChange(
              _extends({}, parameters, {
                exclusiveMaximum: null,
                maximum: newMax,
              })
            );
          } else {
            onChange(
              _extends({}, parameters, {
                exclusiveMaximum: newMax,
                maximum: null,
              })
            );
          }
        },
        isChecked: !!parameters.exclusiveMaximum,
        disabled: !parameters.maximum && !parameters.exclusiveMaximum,
        label: "Exclusive Maximum",
      })
    )
  );
}
