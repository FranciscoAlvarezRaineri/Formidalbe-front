import Input from "@material-ui/core/Input";

import React, { useState, createElement } from "react";

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

// Importar componentes:
import FBCheckbox from "./FBCheckbox";
import Example from "./Example";
import PlaceholderInput from "./PlaceholderInput";

// Importar Utils:
import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";

// specify the inputs required for a string type object
export default function CardLongAnswerParameterInputs({
  parameters,
  onChange,
}) {
  const [elementId] = useState(getRandomId());
  return createElement(
    Container,
    null,
    createElement(Typography,{variant:"h4"}, null, "Minimum Length"),
    createElement(Input, {
      value: parameters.minLength ? parameters.minLength : "",
      placeholder: "Minimum Length",
      key: "minLength",
      type: "number",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            minLength: parseInt(ev.target.value, 10),
          })
        );
      },
      className: "card-modal-number",
    }),
    createElement(Typography,{variant:"h4"}, null, "Maximum Length"),
    createElement(Input, {
      value: parameters.maxLength ? parameters.maxLength : "",
      placeholder: "Maximum Length",
      key: "maxLength",
      type: "number",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            maxLength: parseInt(ev.target.value, 10),
          })
        );
      },
      className: "card-modal-number",
    }),
    createElement(
      Typography,
      {variant:"h4"},
      null,
      "Regular Expression Pattern",
      " ",
      createElement(
        Link,
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
        },
        createElement(Example, {
          id: `${elementId}_regex`,
          type: "help",
          text: "Regular expression pattern that this must satisfy",
        })
      )
    ),
    createElement(Input, {
      value: parameters.pattern ? parameters.pattern : "",
      placeholder: "Regular Expression Pattern",
      key: "pattern",
      type: "text",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            pattern: ev.target.value,
          })
        );
      },
      className: "card-modal-text",
    }),
    createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    }),
    createElement(
      Container,
      {
        className: "card-modal-boolean",
      },
      createElement(FBCheckbox, {
        onChangeValue: () => {
          onChange(
            _extends({}, parameters, {
              "ui:autofocus": parameters["ui:autofocus"]
                ? parameters["ui:autofocus"] !== true
                : true,
            })
          );
        },
        isChecked: parameters["ui:autofocus"]
          ? parameters["ui:autofocus"] === true
          : false,
        label: "Auto Focus",
      })
    )
  );
}
