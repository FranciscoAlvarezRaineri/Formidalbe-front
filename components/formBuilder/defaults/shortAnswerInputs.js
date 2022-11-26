import { useState, createElement, Fragment } from "react";

import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Select from "react-select";

import { getRandomId } from "../utils";
import Example from "../Tooltip";

import FBCheckbox from "../checkbox/FBCheckbox";
import PlaceholderInput from "../inputs/PlaceholderInput";

const formatDictionary = {
  "": "None",
  email: "Email",
  hostname: "Hostname",
  uri: "URI",
  regex: "Regular Expression",
};

const formatTypeDictionary = {
  email: "email",
  url: "uri",
};

const autoDictionary = {
  "": "None",
  email: "Email",
  username: "User Name",
  password: "Password",
  "street-address": "Street Address",
  country: "Country",
};

// specify the inputs required for a string type object
function CardShortAnswerParameterInputs({ parameters, onChange }) {
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
          target: "_blank",
          rel: "noopener noreferrer",
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
    createElement(
      Typography,
      { variant: "h4" },
      null,
      "Format",
      " ",
      createElement(Example, {
        id: `${elementId}_format`,
        type: "help",
        text: "Require string input to match a certain common format",
      })
    ),
    createElement(Select, {
      value: {
        value: parameters.format
          ? formatDictionary[
              typeof parameters.format === "string" ? parameters.format : ""
            ]
          : "",
        label: parameters.format
          ? formatDictionary[
              typeof parameters.format === "string" ? parameters.format : ""
            ]
          : "None",
      },
      placeholder: "Format",
      key: "format",
      options: Object.keys(formatDictionary).map((key) => ({
        value: key,
        label: formatDictionary[key],
      })),
      onChange: (val) => {
        onChange({
          ...parameters,
          format: val.value,
        });
      },
      className: "card-modal-select",
    }),
    createElement(
      Typography,
      { variant: "h5" },
      null,
      "Auto Complete Category",
      " ",
      createElement(
        Link,
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        createElement(Example, {
          id: `${elementId}_autocomplete`,
          type: "help",
          text: "Suggest entries based on the user's browser history",
        })
      )
    ),
    createElement(Select, {
      value: {
        value: parameters["ui:autocomplete"]
          ? autoDictionary[
              typeof parameters["ui:autocomplete"] === "string"
                ? parameters["ui:autocomplete"]
                : ""
            ]
          : "",
        label: parameters["ui:autocomplete"]
          ? autoDictionary[
              typeof parameters["ui:autocomplete"] === "string"
                ? parameters["ui:autocomplete"]
                : ""
            ]
          : "None",
      },
      placeholder: "Auto Complete",
      key: "ui:autocomplete",
      options: Object.keys(autoDictionary).map((key) => ({
        value: key,
        label: autoDictionary[key],
      })),
      onChange: (val) => {
        onChange({
          ...parameters,
          "ui:autocomplete": val.value,
        });
      },
      className: "card-modal-select",
    }),
    createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    }),
    createElement(
      Typography,
      { variant: "h4" },
      null,
      "Column Size",
      " ",
      createElement(
        Link,
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        createElement(Example, {
          id: `${elementId}_column_size`,
          type: "help",
          text: "Set the column size of the input",
        })
      )
    ),
    createElement(Input, {
      value: parameters["ui:column"] ? parameters["ui:column"] : "",
      placeholder: "Column size",
      key: "ui:column",
      type: "number",
      onChange: (ev) => {
        onChange({
          ...parameters,
          "ui:column": ev.target.value,
        });
      },
      className: "card-modal-text",
    }),
    createElement(
      Container,
      // {
      //   className: "card-modal-boolean",
      // },
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

function ShortAnswerField({ parameters, onChange }) {
  return createElement(
    Fragment,
    null,
    createElement(Typography, { variant: "h5" }, null, "Default value"),
    createElement(Input, {
      value: parameters.default,
      placeholder: "Default",
      color: "primary",
      type: "text",
      type: formatTypeDictionary[parameters.format] || "text",
      onChange: (ev) => onChange({ ...parameters, default: ev.target.value }),
      className: "card-text",
    })
  );
}

function Password({ parameters, onChange }) {
  return createElement(
    Fragment,
    null,
    createElement(Typography, { variant: "h5" }, null, "Default password"),
    createElement(Input, {
      value: parameters.default,
      placeholder: "Default",
      type: "password",
      onChange: (ev) => onChange({ ...parameters, default: ev.target.value }),
      className: "card-text",
    })
  );
}

const shortAnswerInput = {
  shortAnswer: {
    displayName: "Short Answer",
    matchIf: [
      {
        types: ["string"],
      },
      ...["email", "hostname", "uri", "regex"].map((format) => ({
        types: ["string"],
        format,
      })),
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "string",
    cardBody: ShortAnswerField,
    modalBody: CardShortAnswerParameterInputs,
  },
  password: {
    displayName: "Password",
    matchIf: [
      {
        types: ["string"],
        widget: "password",
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      "ui:widget": "password",
    },
    type: "string",
    cardBody: Password,
    modalBody: CardShortAnswerParameterInputs,
  },
};

export default shortAnswerInput;
