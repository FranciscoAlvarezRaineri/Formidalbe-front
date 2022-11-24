import * as React from "react";
import * as Mui from "@material-ui/core";
import * as Icon from "@material-ui/icons";
import { createUseStyles } from "react-jss";

const useStyles$8 = createUseStyles({
  cardEnumOption: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: ".5em",
    "& input": {
      width: "80%",
      marginRight: "1em",
      marginBottom: 0,
    },
    "& .delete-button": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
});

// Input field corresponding to an array of values, add and remove
export default function CardEnumOptions({
  initialValues,
  names,
  showNames,
  onChange,
  type,
}) {
  const classes = useStyles$8();
  const possibleValues = [];
  for (let index = 0; index < initialValues.length; index += 1) {
    const value = initialValues[index];
    let name = `${value}`;
    if (names && index < names.length) name = names[index];
    possibleValues.push(
      /*#__PURE__*/ React.createElement(
        "div",
        {
          key: index,
          className: classes.cardEnumOption,
        },
        /*#__PURE__*/ React.createElement(Mui.Input, {
          value: value === undefined || value === null ? "" : value,
          placeholder: "Possible Value",
          key: `val-${index}`,
          type: type === "string" ? "text" : "number",
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
        /*#__PURE__*/ React.createElement(Mui.Input, {
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
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "delete-button",
          },
          /*#__PURE__*/ React.createElement(Icon.Close, {
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
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    possibleValues,
    /*#__PURE__*/ React.createElement(Icon.Add, {
      onClick: () => {
        // add a new dropdown option
        onChange(
          [...initialValues, type === "string" ? "" : 0],
          names ? [...names, ""] : undefined
        );
      },
    })
  );
}
