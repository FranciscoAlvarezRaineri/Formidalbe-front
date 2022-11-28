import { createElement, useState } from "react";

import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import defaultInputs from "./defaultInputs";
import shortAnswerInput from "./shortAnswerInputs";
import longAnswerInput from "./longAnswerInputs";
import numberInputs from "./numberInputs";
import FBCheckbox from "../checkbox/FBCheckbox";
import Section from "../Section";

import {
  getRandomId,
  excludeKeys,
  generateElementComponentsFromSchemas,
  generateCategoryHash,
} from "../utils";

// specify the inputs required for a string type object
function CardArrayParameterInputs({ parameters, onChange }) {
  return createElement(
    "div",
    null,
    createElement(Typography, { variant: "h6" }, null, "Minimum Items"),
    createElement(Input, {
      value: parameters.minItems || "",
      placeholder: "ex: 2",
      key: "minimum",
      type: "number",
      onChange: (ev) => {
        onChange({
          ...parameters,
          minItems: parseInt(ev.target.value, 10),
        });
      },
      className: "card-modal-number",
    }),
    createElement(Typography, { variant: "h6" }, null, "Maximum Items"),
    createElement(Input, {
      value: parameters.maxItems || "",
      placeholder: "ex: 2",
      key: "maximum",
      type: "number",
      onChange: (ev) => {
        onChange({
          ...parameters,
          maxItems: parseInt(ev.target.value, 10),
        });
      },
      className: "card-modal-number",
    })
  );
}

function getInnerCardComponent({ defaultFormInputs }) {
  return function InnerCard({ parameters, onChange, mods }) {
    const [elementId] = useState(getRandomId);
    const newDataProps = {};
    const newUiProps = {};
    const allFormInputs = excludeKeys(
      Object.assign(
        {},
        defaultFormInputs,
        (mods && mods.customFormInputs) || {}
      ),
      mods && mods.deactivatedFormInputs
    );

    // parse components into data and ui relevant pieces
    Object.keys(parameters).forEach((propName) => {
      if (propName.startsWith("ui:*")) {
        newUiProps[propName.substring(4)] = parameters[propName];
      } else if (propName.startsWith("ui:")) {
        newUiProps[propName] = parameters[propName];
      } else if (!["name", "required"].includes(propName)) {
        newDataProps[propName] = parameters[propName];
      }
    });
    const definitionData = parameters.definitionData
      ? parameters.definitionData
      : {};
    const definitionUi = parameters.definitionUi ? parameters.definitionUi : {};
    const [cardOpen, setCardOpen] = useState(true);
    if (parameters.type !== "array") {
      return createElement("h4", null, "Not an array ");
    }
    return createElement(
      "div",
      {
        className: "card-array",
      },
      createElement(FBCheckbox, {
        onChangeValue: () => {
          if (newDataProps.items.type === "object") {
            onChange({
              ...parameters,
              items: {
                ...newDataProps.items,
                type: "string",
              },
            });
          } else {
            onChange({
              ...parameters,
              items: {
                ...newDataProps.items,
                type: "object",
              },
            });
          }
        },
        isChecked: newDataProps.items.type === "object",
        label: "Section",
        id: `${elementId}_issection`,
      }),
      generateElementComponentsFromSchemas({
        schemaData: {
          properties: {
            item: newDataProps.items,
          },
        },
        uiSchemaData: {
          item: newUiProps.items,
        },
        onChange: (schema, uischema) => {
          onChange({
            ...parameters,
            items: schema.properties.item,
            "ui:*items": uischema.item || {},
          });
        },
        path: elementId,
        definitionData,
        definitionUi,
        hideKey: true,
        cardOpenArray: [cardOpen],
        setCardOpenArray: (newArr) => setCardOpen(newArr[0]),
        allFormInputs,
        mods,
        categoryHash: generateCategoryHash(allFormInputs),
        Card: (props) =>
          createElement(Card, { ...props, showObjectNameInput: false }),
        Section,
      })
    );
  };
}

const defaultFormInputs = {
  ...defaultInputs,
  ...shortAnswerInput,
  ...longAnswerInput,
  ...numberInputs,
};

defaultFormInputs.array = {
  displayName: "Array",
  matchIf: [
    {
      types: ["array"],
    },
  ],
  defaultDataSchema: {
    items: {
      type: "string",
    },
  },
  defaultUiSchema: {},
  type: "array",
  cardBody: getInnerCardComponent({
    defaultFormInputs,
  }),
  modalBody: CardArrayParameterInputs,
};
const arrayInputs = {
  array: {
    displayName: "Array",
    matchIf: [
      {
        types: ["array"],
      },
    ],
    defaultDataSchema: {
      items: {
        type: "string",
      },
    },
    defaultUiSchema: {},
    type: "array",
    cardBody: getInnerCardComponent({
      defaultFormInputs,
    }),
    modalBody: CardArrayParameterInputs,
  },
};

export default arrayInputs;
