import { createElement, Fragment } from "react";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

// Input field corresponding to an array of values, add and remove
export default function CardEnumOptions({
  initialValues,
  names,
  showNames,
  onChange,
  type,
}) {
  const disabled = type === "bool";
  const possibleValues = [];
  for (let index = 0; index < initialValues.length; index += 1) {
    const value = initialValues[index];
    let name = `${value}`;
    if (names && index < names.length) name = names[index];
    possibleValues.push(
      createElement(
        "div",
        {
          key: index,
        },
        createElement(Input, {
          disabled,
          value: value === undefined || value === null ? "" : value,
          placeholder: "Possible Value",
          key: `val-${index}`,
          type: type === "string" || "bool" ? "text" : "number",
          onChange: (ev) => {
            let newVal;
            switch (type) {
              case "string":
                newVal = ev.target.value;
                break;
              case "number":
              case "integer":
                newVal = parseFloat(ev.target.value);
                if (Number.isInteger(newVal))
                  newVal = parseInt(ev.target.value, 10);
                if (Number.isNaN(newVal)) newVal = type === "string" ? "" : 0;
                break;
              default:
                throw new Error(`Enum called with unknown type ${type}`);
            }
            onChange(
              [
                ...initialValues.slice(0, index),
                newVal,
                ...initialValues.slice(index + 1),
              ],
              names
            );
          },
          className: "card-text",
        }),
        createElement(Input, {
          disabled,
          value: name || "",
          placeholder: "Label",
          key: `name-${index}`,
          type: "text",
          onChange: (ev) => {
            if (names)
              onChange(initialValues, [
                ...names.slice(0, index),
                ev.target.value,
                ...names.slice(index + 1),
              ]);
          },
          className: "card-text",
          style: {
            display: showNames ? "initial" : "none",
          },
        }),
        createElement(
          Button,
          { disabled },
          createElement(Close, {
            className: "delete-button",
            onClick: () => {
              // remove this value
              onChange(
                [
                  ...initialValues.slice(0, index),
                  ...initialValues.slice(index + 1),
                ],
                names
                  ? [...names.slice(0, index), ...names.slice(index + 1)]
                  : undefined
              );
            },
          })
        )
      )
    );
  }

  return createElement(
    Fragment,
    null,
    possibleValues,

    createElement(
      Button,
      { disabled },
      createElement(Add, {
        onClick: () => {
          // add a new dropdown option
          onChange(
            [...initialValues, type === "string" ? "" : 0],
            names ? [...names, ""] : undefined
          );
        },
      })
    )
  );
}
