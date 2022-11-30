import { useState, createElement, Fragment } from "react";

import Container from "@material-ui/core/Container";
import FBCheckbox from "../checkbox/FBCheckbox";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import CardEnumOptions from "../CardEnumOptions";
import { getRandomId } from "../utils";

// specify the inputs required for a string type object
export function CardDefaultParameterInputs({ parameters, onChange }) {
  return createElement(Container, null);
}

const getInputCardBodyComponent = ({ type }) =>
  function InputCardBodyComponent({ parameters, onChange }) {
    return createElement(
      Fragment,
      null,
      createElement("h5", null, "Valor por defecto"),
      createElement(Input, {
        value: parameters.default || "",
        placeholder: "Default",
        type: type,
        onChange: (ev) => onChange({ ...parameters, default: ev.target.value }),
        className: "card-text",
      })
    );
  };

function Checkbox({ parameters, onChange }) {
  return createElement(
    Container,
    {
      className: "card-boolean",
    },
    createElement(FBCheckbox, {
      onChangeValue: () => {
        onChange({
          ...parameters,
          default: parameters.default ? parameters.default !== true : true,
        });
      },
      isChecked: parameters.default ? parameters.default === true : false,
      label: "Default",
    })
  );
}

function MultipleChoice({ parameters, onChange }) {
  const enumArray = Array.isArray(parameters.enum) ? parameters.enum : [];
  const containsUnparsableString = enumArray.some((val) => isNaN(val));
  const containsString =
    containsUnparsableString ||
    enumArray.some((val) => typeof val === "string");
  const [isNumber, setIsNumber] = useState(
    !!enumArray.length && !containsString
  );
  const [elementId] = useState(getRandomId());

  return createElement(
    Container,
    {
      className: "card-enum",
    },
    createElement(Typography, { variant: "h6" }, null, "Valores posibles"),
    createElement(FBCheckbox, {
      onChangeValue: () => {
        if (Array.isArray(parameters.enumNames)) {
          // remove the enumNames
          onChange({
            ...parameters,
            enumNames: null,
          });
        } else {
          // create enumNames as a copy of enum values
          onChange({
            ...parameters,
            enumNames: enumArray.map((val) => `${val}`),
          });
        }
      },
      isChecked: Array.isArray(parameters.enumNames),
      label: "La etiquieta a visualizar es distinta del valor",
      id: `${elementId}_different`,
    }),
    createElement(
      Container,
      null,
      createElement(FBCheckbox, {
        onChangeValue: () => {
          if (containsString || !isNumber) {
            // attempt converting enum values into numbers
            try {
              const newEnum = enumArray.map((val) => {
                let newNum = 0;
                if (val) newNum = parseFloat(val) || 0;
                if (Number.isNaN(newNum))
                  throw new Error(`Could not convert ${val}`);
                return newNum;
              });
              setIsNumber(true);
              onChange({
                ...parameters,
                enum: newEnum,
              });
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(error);
            }
          } else {
            // convert enum values back into strings
            const newEnum = enumArray.map((val) => `${val || 0}`);
            setIsNumber(false);
            onChange({
              ...parameters,
              enum: newEnum,
            });
          }
        },
        isChecked: isNumber,
        disabled: containsUnparsableString,
        label: "Forzar nùmero",
        id: `${elementId}_forceNumber`,
      })
    ),
    createElement(CardEnumOptions, {
      initialValues: enumArray,
      names: Array.isArray(parameters.enumNames)
        ? parameters.enumNames.map((val) => `${val}`)
        : undefined,
      showNames: Array.isArray(parameters.enumNames),
      onChange: (newEnum, newEnumNames) =>
        onChange({
          ...parameters,
          enum: newEnum,
          enumNames: newEnumNames,
        }),
      type: isNumber ? "number" : "string",
    })
  );
}

const defaultInputs = {
  dateTime: {
    displayName: "Fecha-Hora",
    matchIf: [
      {
        types: ["string"],
        format: "date-time",
      },
    ],
    defaultDataSchema: {
      format: "date-time",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: getInputCardBodyComponent({
      type: "datetime-local",
    }),
    modalBody: CardDefaultParameterInputs,
  },
  date: {
    displayName: "Fecha",
    matchIf: [
      {
        types: ["string"],
        format: "date",
      },
    ],
    defaultDataSchema: {
      format: "date",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: getInputCardBodyComponent({
      type: "date",
    }),
    modalBody: CardDefaultParameterInputs,
  },
  time: {
    displayName: "Hora",
    matchIf: [
      {
        types: ["string"],
        format: "time",
      },
    ],
    defaultDataSchema: {
      format: "time",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: getInputCardBodyComponent({
      type: "time",
    }),
    modalBody: CardDefaultParameterInputs,
  },
  checkbox: {
    displayName: "Checkbox",
    matchIf: [
      {
        types: ["boolean"],
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "boolean",
    cardBody: Checkbox,
    modalBody: CardDefaultParameterInputs,
  },
  radio: {
    displayName: "Radio",
    matchIf: [
      {
        types: ["string", "number", "integer", "array", "boolean", "null"],
        widget: "radio",
        enum: true,
      },
    ],
    defaultDataSchema: {
      enum: [],
    },
    defaultUiSchema: {
      "ui:widget": "radio",
    },
    type: "string",
    cardBody: MultipleChoice,
    modalBody: CardDefaultParameterInputs,
  },
  dropdown: {
    displayName: "Select",
    matchIf: [
      {
        types: ["string", "number", "integer", "array", "boolean", "null"],
        widget: "select",
        enum: true,
      },
    ],
    defaultDataSchema: {
      enum: [],
    },
    defaultUiSchema: {
      "ui:widget": "select",
    },
    type: "string",
    cardBody: MultipleChoice,
    modalBody: CardDefaultParameterInputs,
  },
};

export default defaultInputs;
