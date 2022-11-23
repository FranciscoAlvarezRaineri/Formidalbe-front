import React__default, { useState } from "react";

// import { Input } from "reactstrap";
import { Input } from '@material-ui/core'

import Select from "react-select";

import getRandomId from "../FormBuilderUtils/getRandomId";
import Example from "./Example";

import PlaceholderInput from "./PlaceholderInput";
import FBCheckbox from "./FBCheckbox";

import _extends from "../FormBuilderUtils/_extends";

const formatDictionary = {
  "": "None",
  email: "Email",
  hostname: "Hostname",
  uri: "URI",
  regex: "Regular Expression",
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
export default function CardShortAnswerParameterInputs({
  parameters,
  onChange,
}) {
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ React__default.createElement(
    "div",
    null,
    /*#__PURE__*/ React__default.createElement("h4", null, "Minimum Length"),
    /*#__PURE__*/ React__default.createElement(Input, {
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
    /*#__PURE__*/ React__default.createElement("h4", null, "Maximum Length"),
    /*#__PURE__*/ React__default.createElement(Input, {
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
    /*#__PURE__*/ React__default.createElement(
      "h4",
      null,
      "Regular Expression Pattern",
      " ",
      /*#__PURE__*/ React__default.createElement(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        /*#__PURE__*/ React__default.createElement(Example, {
          id: `${elementId}_regex`,
          type: "help",
          text: "Regular expression pattern that this must satisfy",
        })
      )
    ),
    /*#__PURE__*/ React__default.createElement(Input, {
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
    /*#__PURE__*/ React__default.createElement(
      "h4",
      null,
      "Format",
      " ",
      /*#__PURE__*/ React__default.createElement(Example, {
        id: `${elementId}_format`,
        type: "help",
        text: "Require string input to match a certain common format",
      })
    ),
    /*#__PURE__*/ React__default.createElement(Select, {
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
        onChange(
          _extends({}, parameters, {
            format: val.value,
          })
        );
      },
      className: "card-modal-select",
    }),
    /*#__PURE__*/ React__default.createElement(
      "h5",
      null,
      "Auto Complete Category",
      " ",
      /*#__PURE__*/ React__default.createElement(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        /*#__PURE__*/ React__default.createElement(Example, {
          id: `${elementId}_autocomplete`,
          type: "help",
          text: "Suggest entries based on the user's browser history",
        })
      )
    ),
    /*#__PURE__*/ React__default.createElement(Select, {
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
        onChange(
          _extends({}, parameters, {
            "ui:autocomplete": val.value,
          })
        );
      },
      className: "card-modal-select",
    }),
    /*#__PURE__*/ React__default.createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    }),
    /*#__PURE__*/ React__default.createElement(
      "h4",
      null,
      "Column Size",
      " ",
      /*#__PURE__*/ React__default.createElement(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        /*#__PURE__*/ React__default.createElement(Example, {
          id: `${elementId}_column_size`,
          type: "help",
          text: "Set the column size of the input",
        })
      )
    ),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters["ui:column"] ? parameters["ui:column"] : "",
      placeholder: "Column size",
      key: "ui:column",
      type: "number",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            "ui:column": ev.target.value,
          })
        );
      },
      className: "card-modal-text",
    }),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-modal-boolean",
      },
      /*#__PURE__*/ React__default.createElement(FBCheckbox, {
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
