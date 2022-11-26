import { useState, createElement } from "react";
import { Typography } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

// Importar componentes:
import Example from "../Tooltip";
import CardSelector from "./CardSelector";
import ValueSelector from "./ValueSelector";

import { getRandomId } from "../utils";

// a possible dependency
export default function DependencyPossibility({
  possibility,
  neighborNames,
  path,
  onChange,
  onDelete,
  parentEnums,
  parentType,
  parentName,
  parentSchema,
}) {
  const [elementId] = useState(getRandomId());
  return createElement(
    "div",
    {
      className: "form-dependency-condition",
    },
    createElement(
      Typography,
      { variant: "h5" },
      "Display the following:",
      " ",
      createElement(Example, {
        id: `${elementId}_bulk`,
        type: "help",
        text: "Choose the other form elements that depend on this one",
      })
    ),
    createElement(CardSelector, {
      possibleChoices:
        neighborNames.filter((name) => name !== parentName) || [],
      chosenChoices: possibility.children,
      onChange: (chosenChoices) =>
        onChange({ ...possibility, children: [...chosenChoices] }),
      placeholder: "Choose a dependent...",
      path: path,
    }),
    createElement(
      Typography,
      { variant: "h5" },
      'If "',
      parentName,
      '" has ',
      possibility.value ? "the value:" : "a value."
    ),
    possibility.value
      ? createElement(
          "div",
          {
            style: {
              display: possibility.value ? "block" : "none",
            },
          },
          createElement(ValueSelector, {
            possibility: possibility,
            onChange: (newPossibility) => onChange(newPossibility),
            parentEnums: parentEnums,
            parentType: parentType,
            parentName: parentName,
            parentSchema: parentSchema,
            path: path,
          })
        )
      : null,
    createElement(Close, {
      onClick: () => onDelete(),
    })
  );
}
