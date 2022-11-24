import Input from "@material-ui/core/Input";

import React__default, { useState } from "react";

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
  return React__default.createElement(
    "div",
    null,
    React__default.createElement("h4", null, "Minimum Length"),
    React__default.createElement(Input, {
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
    React__default.createElement("h4", null, "Maximum Length"),
    React__default.createElement(Input, {
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
    React__default.createElement(
      "h4",
      null,
      "Regular Expression Pattern",
      " ",
      React__default.createElement(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
        },
        React__default.createElement(Example, {
          id: `${elementId}_regex`,
          type: "help",
          text: "Regular expression pattern that this must satisfy",
        })
      )
    ),
    React__default.createElement(Input, {
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
    React__default.createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    }),
    React__default.createElement(
      "div",
      {
        className: "card-modal-boolean",
      },
      React__default.createElement(FBCheckbox, {
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
