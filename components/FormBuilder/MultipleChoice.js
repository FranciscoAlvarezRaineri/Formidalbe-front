import React, { useState, createElement } from "react";
import { createUseStyles } from "react-jss";

import FBCheckbox from "./FBCheckbox";
import CardEnumOptions from "./CardEnumOptions";

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";

const useStyles$3 = createUseStyles({
  hidden: {
    display: "none",
  },
});

export default function MultipleChoice({ parameters, onChange }) {
  const classes = useStyles$3();
  const enumArray = Array.isArray(parameters.enum) ? parameters.enum : [];
  // eslint-disable-next-line no-restricted-globals
  const containsUnparsableString = enumArray.some((val) => isNaN(val));
  const containsString =
    containsUnparsableString ||
    enumArray.some((val) => typeof val === "string");
  const [isNumber, setIsNumber] = useState(
    !!enumArray.length && !containsString
  );
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ createElement(
    Container,
    {
      className: "card-enum",
    },
    /*#__PURE__*/ createElement(Typography,{variant:"h3"}, null, "Possible Values"),
    /*#__PURE__*/ createElement(FBCheckbox, {
      onChangeValue: () => {
        if (Array.isArray(parameters.enumNames)) {
          // remove the enumNames
          onChange(
            _extends({}, parameters, {
              enumNames: null,
            })
          );
        } else {
          // create enumNames as a copy of enum values
          onChange(
            _extends({}, parameters, {
              enumNames: enumArray.map((val) => `${val}`),
            })
          );
        }
      },
      isChecked: Array.isArray(parameters.enumNames),
      label: "Display label is different from value",
      id: `${elementId}_different`,
    }),
    /*#__PURE__*/ createElement(
      Container,
      {
        className:
          containsUnparsableString || !enumArray.length ? classes.hidden : "",
      },
      /*#__PURE__*/ createElement(FBCheckbox, {
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
              onChange(
                _extends({}, parameters, {
                  enum: newEnum,
                })
              );
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(error);
            }
          } else {
            // convert enum values back into strings
            const newEnum = enumArray.map((val) => `${val || 0}`);
            setIsNumber(false);
            onChange(
              _extends({}, parameters, {
                enum: newEnum,
              })
            );
          }
        },
        isChecked: isNumber,
        disabled: containsUnparsableString,
        label: "Force number",
        id: `${elementId}_forceNumber`,
      })
    ),
    /*#__PURE__*/ createElement(CardEnumOptions, {
      initialValues: enumArray,
      names: Array.isArray(parameters.enumNames)
        ? parameters.enumNames.map((val) => `${val}`)
        : undefined,
      showNames: Array.isArray(parameters.enumNames),
      onChange: (newEnum, newEnumNames) =>
        onChange(
          _extends({}, parameters, {
            enum: newEnum,
            enumNames: newEnumNames,
          })
        ),
      type: isNumber ? "number" : "string",
    })
  );
}
