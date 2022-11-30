import { useState, createElement } from "react";
import Typography from "@material-ui/core/Typography";
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
      " Exhibir lo siguiente:",
      " ",
      createElement(Example, {
        id: `${elementId}_bulk`,
        type: "help",
        text: "Elija los otros elementos del formulario que dependan de este",
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
      'Si "',
      parentName,
      '" tiene ',
      possibility.value ? "el valor:" : "a value."
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
