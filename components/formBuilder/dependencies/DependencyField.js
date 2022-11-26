import { useState, createElement, Fragment, useEffect } from "react";
import { Typography, Tooltip } from "@material-ui/core";
import Add from "@material-ui/icons/Add";

// Importar componentes:
import Example from "../Tooltip";
import FBRadioGroup from "../radio/FBRadioGroup";
import DependencyWarning from "./DependencyWarning";
import DependencyPossibility from "./DependencyPossibility";

import { getRandomId } from "../utils";

// checks whether an array corresponds to oneOf dependencies
function checkIfValueBasedDependency(dependents) {
  let valueBased = true;
  if (dependents && Array.isArray(dependents) && dependents.length > 0) {
    dependents.forEach((possibility) => {
      if (!possibility.value || !possibility.value.enum) {
        valueBased = false;
      }
    });
  } else {
    valueBased = false;
  }
  return valueBased;
}

export default function DependencyField({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  const valueBased = checkIfValueBasedDependency(parameters.dependents || []);
  return createElement(
    "div",
    {
      className: `form-dependency`,
    },
    createElement(
      Typography,
      { variant: "h5" },
      "Dependencias",
      " ",
      createElement(Example, {
        id: `${elementId}_dependent`,
        type: "help",
        text: "Control whether other form elements show based on this one",
      })
    ),
    !!parameters.dependents &&
      parameters.dependents.length > 0 &&
      createElement(
        Fragment,
        null,
        createElement(FBRadioGroup, {
          defaultValue: valueBased ? "value" : "definition",
          horizontal: false,
          options: [
            {
              value: "definition",
              label: "Any value dependency",
            },
            {
              value: "value",
              label: createElement(
                Fragment,
                null,
                "Specific value dependency",
                " ",
                createElement(Example, {
                  id: `${elementId}_valuebased`,
                  type: "help",
                  text: "Specify whether these elements should show based on this element's value",
                })
              ),
            },
          ],
          onChange: (selection) => {
            if (parameters.dependents) {
              const newDependents = [...parameters.dependents];
              if (selection === "definition") {
                parameters.dependents.forEach((possibility, index) => {
                  newDependents[index] = {
                    ...possibility,
                    value: undefined,
                  };
                });
              } else {
                parameters.dependents.forEach((possibility, index) => {
                  newDependents[index] = {
                    ...possibility,
                    value: { enum: [] },
                  };
                });
              }
              onChange({
                ...parameters,
                dependents: newDependents,
              });
            }
          },
        })
      ),
    createElement(DependencyWarning, {
      parameters: parameters,
    }),
    createElement(
      "div",
      {
        className: "form-dependency-conditions",
      },
      parameters.dependents
        ? parameters.dependents.map((possibility, index) =>
            createElement(DependencyPossibility, {
              possibility: possibility,
              neighborNames: parameters.neighborNames || [],
              parentEnums: parameters.enum,
              parentType: parameters.type,
              parentName: parameters.name,
              parentSchema: parameters.schema,
              path: parameters.path,
              key: `${elementId}_possibility${index}`,
              onChange: (newPossibility) => {
                const newDependents = parameters.dependents
                  ? [...parameters.dependents]
                  : [];
                newDependents[index] = newPossibility;
                onChange({
                  ...parameters,
                  dependents: newDependents,
                });
              },
              onDelete: () => {
                const newDependents = parameters.dependents
                  ? [...parameters.dependents]
                  : [];
                onChange({
                  ...parameters,
                  dependents: newDependents,
                });
              },
            })
          )
        : "",
      createElement(
        Tooltip,
        {
          title:
            "Add another dependency relation linking this element and other form elements",
          id: `${elementId}_adddependency`,
        },
        createElement(Add, {
          onClick: () => {
            const newDependents = parameters.dependents
              ? [...parameters.dependents]
              : [];
            newDependents.push({
              children: [],
              value: valueBased
                ? {
                    enum: [],
                  }
                : undefined,
            });
            onChange({
              ...parameters,
              dependents: newDependents,
            });
          },
        })
      )
    )
  );
}
