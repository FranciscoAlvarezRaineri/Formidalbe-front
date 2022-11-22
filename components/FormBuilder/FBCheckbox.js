import React__default from "react";

import { createUseStyles } from "react-jss";
import classnames from "classnames";

const useStyles$c = createUseStyles({
  checkbox: {
    "& *": {
      display: "inline-block",
    },
    "& input": {
      marginRight: "5px",
    },
  },
});

export default function FBCheckbox({
  onChangeValue,
  value = "",
  isChecked = false,
  label = "",
  use = "action",
  disabled = false,
  id = "",
  dataTest = "",
  labelClassName = "",
}) {
  const classjss = useStyles$c();
  const classes = classnames("fb-checkbox", {
    "edit-checkbox": !disabled && use === "edit",
    "action-checkbox": !disabled && use === "action",
    "disabled-checked-checkbox": disabled && isChecked,
    "disabled-unchecked-checkbox": disabled && !isChecked,
  });
  const potentialCheckboxId = id !== "" ? id : label;
  const checkboxId = potentialCheckboxId !== "" ? potentialCheckboxId : null;
  return /*#__PURE__*/ React__default.createElement(
    "div",
    {
      "data-test": "checkbox",
      className: `${classes} ${classjss.checkbox}`,
    },
    /*#__PURE__*/ React__default.createElement("input", {
      type: "checkbox",
      id: checkboxId,
      "data-test": dataTest || undefined,
      onChange: disabled ? () => {} : onChangeValue,
      value: value,
      disabled: disabled,
      checked: isChecked,
    }),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "checkbox-overlay",
      },
      label &&
        /*#__PURE__*/ React__default.createElement(
          "label",
          {
            htmlFor: checkboxId,
            className: labelClassName || undefined,
          },
          label
        )
    )
  );
}
