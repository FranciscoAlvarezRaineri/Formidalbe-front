import React__default from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";

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
  const potentialCheckboxId = id !== "" ? id : label;
  const checkboxId = potentialCheckboxId !== "" ? potentialCheckboxId : null;
  return /*#__PURE__*/ React__default.createElement(
    "div",
    null,
    React__default.createElement(
      InputLabel,
      null,
      React__default.createElement(Checkbox, {
        id: checkboxId,
        onChange: disabled ? () => {} : onChangeValue,
        value: value,
        disabled: disabled,
        checked: isChecked,
      }),
      label
    )
  );
}
