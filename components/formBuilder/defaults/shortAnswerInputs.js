import { useState, createElement, Fragment } from "react";

import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
//import Select from "react-select";

import { getRandomId } from "../utils";
import Example from "../Tooltip";

import FBCheckbox from "../checkbox/FBCheckbox";
import PlaceholderInput from "../inputs/PlaceholderInput";

const formatDictionary = {
  "": "Ninguno",
  email: "Email",
  hostname: "Nombre del Servidor",
  uri: "URI",
  regex: "Expresion Regular",
};

const formatTypeDictionary = {
  email: "email",
  url: "uri",
};

const autoDictionary = {
  "": "Ninguno",
  email: "Email",
  username: "Nombre de Usuario",
  password: "Contraseña",
  "street-address": "Diección",
  country: "País",
};

// specify the inputs required for a string type object
function CardShortAnswerParameterInputs({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());

  return createElement(
    Container,
    null,
    createElement(Typography, { variant: "h5" }, null, "Largo Minimo"),
    createElement(Input, {
      value: parameters.minLength ? parameters.minLength : "",
      placeholder: "Largo Minimo",
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
    createElement(Typography, { variant: "h5" }, null, "Largo Maximo"),
    createElement(Input, {
      value: parameters.maxLength ? parameters.maxLength : "",
      placeholder: "Largo Maximo",
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
      { variant: "h5" },
      null,
      "Patrón de Expresión Regular",
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
          text: "El Patrón de expresión regular a satisfacer",
        })
      )
    ),
    createElement(Input, {
      value: parameters.pattern ? parameters.pattern : "",
      placeholder: "Patrón de Expresión Regular",
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
      { variant: "h5" },
      null,
      "Formato",
      " ",
      createElement(Example, {
        id: `${elementId}_format`,
        type: "help",
        text: "Requiere que un input ´String´machee sierto formato comun",
      })
    ),
    <Autocomplete
    id="Formato"
    options={Object.keys(autoDictionary).map((key) => ({
           value: key,
           label: autoDictionary[key],
         }))}
    getOptionLabel={(option) => option.label}
    style={{ width: "100%" }}
    
    onChange={(event,val) => {
      onChange({
        ...parameters,
        format: val.value,
      })}}
    renderInput={(params) => <TextField {...params} label="Ninguno"  />}
  />,

    /////////////////////ORIGINAL /////////////////////
    // createElement(Select, {
    //   value: {
    //     value: parameters.format
    //       ? formatDictionary[
    //           typeof parameters.format === "string" ? parameters.format : ""
    //         ]
    //       : "",
    //     label: parameters.format
    //       ? formatDictionary[
    //           typeof parameters.format === "string" ? parameters.format : ""
    //         ]
    //       : "Ninguno",
    //   },
    //   placeholder: "Formato",
    //   key: "format",
    //   options: Object.keys(formatDictionary).map((key) => ({
    //     value: key,
    //     label: formatDictionary[key],
    //   })),
    //   onChange: (val) => {
    //     onChange({
    //       ...parameters,
    //       format: val.value,
    //     });
    //   },
    //   className: "card-modal-select",
    // }),
    createElement(
      Typography,
      { variant: "h5" },
      null,
      "Categoria a Auto Completar",
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
          text: "Sugerir entradas basadas en el historial del navegador del usuario",
        })
      )
    ),
    <Autocomplete
    id="Categoria-a-Autocompletar"
    options={Object.keys(autoDictionary).map((key) => ({
           value: key,
           label: autoDictionary[key],
         }))}
    getOptionLabel={(option) => option.label}
    style={{ width: "100%" }}
    
    onChange={(event,val) => {
           onChange({
             ...parameters,
             "ui:autocomplete": val.value,
           })}}
    renderInput={(params) => <TextField {...params} label="Ninguno"  />}
  />,
    //////////////////////////ORIGINAL/////////////////////
    // createElement(Select, {
    //   value: {
    //     value: parameters["ui:autocomplete"]
    //       ? autoDictionary[
    //           typeof parameters["ui:autocomplete"] === "string"
    //             ? parameters["ui:autocomplete"]
    //             : ""
    //         ]
    //       : "",
    //     label: parameters["ui:autocomplete"]
    //       ? autoDictionary[
    //           typeof parameters["ui:autocomplete"] === "string"
    //             ? parameters["ui:autocomplete"]
    //             : ""
    //         ]
    //       : "Ninguno",
    //   },
    //   placeholder: "Auto Completar",
    //   key: "ui:autocomplete",
    //   options: Object.keys(autoDictionary).map((key) => ({
    //     value: key,
    //     label: autoDictionary[key],
    //   })),
    //   onChange: (val) => {
    //     onChange({
    //       ...parameters,
    //       "ui:autocomplete": val.value,
    //     });
    //   },
    //   className: "card-modal-select",
    // }),
    createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    }),
    createElement(
      Typography,
      { variant: "h5" },
      null,
      "Tamaño de la Columna",
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
          text: "Setea el tamaño de la columna del input",
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
    createElement(Typography, { variant: "h6" }, null, "Valor por defecto"),
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
    createElement(Typography, { variant: "h6" }, null, "Contraseña por defecto"),
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
    displayName: "Respuesta Corta",
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
    displayName: "Contraseña",
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
