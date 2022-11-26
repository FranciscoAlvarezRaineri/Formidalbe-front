import { useState, createElement, Fragment } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Input from "@material-ui/core/Input";

// Importar componentes:
import FBCheckbox from "../checkbox/FBCheckbox";
import Example from "../Tooltip";
import PlaceholderInput from "../inputs/PlaceholderInput";

// Importar Utils:
import { getRandomId } from "../utils";

// specify the inputs required for a string type object
function CardLongAnswerParameterInputs({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  return createElement(
    Container,
    null,
    createElement(Typography, { variant: "h4" }, null, "Minimum Length"),
    createElement(Input, {
      value: parameters.minLength ? parameters.minLength : "",
      placeholder: "Minimum Length",
      key: "minLength",
      type: "number",
      onChange: (ev) => {
        onChange({
          ...parameters,
          minLength: parseInt(ev.target.value, 10),
        });
      },
      className: "card-modal-number",
    }),
    createElement(Typography, { variant: "h4" }, null, "Maximum Length"),
    createElement(Input, {
      value: parameters.maxLength ? parameters.maxLength : "",
      placeholder: "Maximum Length",
      key: "maxLength",
      type: "number",
      onChange: (ev) => {
        onChange({
          ...parameters,
          maxLength: parseInt(ev.target.value, 10),
        });
      },
      className: "card-modal-number",
    }),
    createElement(
      Typography,
      { variant: "h4" },
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
        onChange({
          ...parameters,
          pattern: ev.target.value,
        });
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
          onChange({
            ...parameters,
            "ui:autofocus": parameters["ui:autofocus"]
              ? parameters["ui:autofocus"] !== true
              : true,
          });
        },
        isChecked: parameters["ui:autofocus"]
          ? parameters["ui:autofocus"] === true
          : false,
        label: "Auto Focus",
      })
    )
  );
}

function LongAnswer({ parameters, onChange }) {
  return createElement(
    Fragment,
    null,
    createElement(Typography, { variant: "h5" }, "Default value"),
    createElement(Input, {
      value: parameters.default,
      placeholder: "Default",
      type: "text",
      color: "secondary",
      onChange: (ev) => onChange({ ...parameters, default: ev.target.value }),
      className: "card-textarea",
    })
  );
}

const longAnswerInput = {
  longAnswer: {
    displayName: "Long Answer",
    matchIf: [
      {
        types: ["string"],
        widget: "textarea",
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      "ui:widget": "textarea",
    },
    type: "string",
    cardBody: LongAnswer,
    modalBody: CardLongAnswerParameterInputs,
  },
};

export default longAnswerInput;
