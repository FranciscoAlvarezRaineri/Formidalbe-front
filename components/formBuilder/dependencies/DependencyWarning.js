import { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Example from "../Tooltip";

import { getRandomId } from "../utils";

// warning message if not all possibilities specified
export default function DependencyWarning({ parameters }) {
  const [elementId] = useState(getRandomId());
  if (
    parameters.enum &&
    parameters.dependents &&
    parameters.dependents.length &&
    parameters.dependents[0].value
  ) {
    // get the set of defined enum values
    const definedVals = new Set([]);
    (parameters.dependents || []).forEach((possibility) => {
      if (possibility.value && possibility.value.enum)
        possibility.value.enum.forEach((val) => definedVals.add(val));
    });
    const undefinedVals = [];
    if (Array.isArray(parameters.enum))
      parameters.enum.forEach((val) => {
        if (!definedVals.has(val)) undefinedVals.push(val);
      });
    if (undefinedVals.length === 0) return null;
    return createElement(
      Fragment,
      null,
      createElement(
        "p",
        null,
        "Warning! The following values do not have associated dependency values:",
        " ",
        createElement(Example, {
          id: `${elementId}_valuewarning`,
          type: "help",
          text: "Each possible value for a value-based dependency must be defined to work properly",
        })
      ),
      createElement(
        List,
        null,
        undefinedVals.map((val, index) =>
          createElement(
            ListItem,
            {
              key: index,
            },
            val
          )
        )
      )
    );
  }
  return null;
}
