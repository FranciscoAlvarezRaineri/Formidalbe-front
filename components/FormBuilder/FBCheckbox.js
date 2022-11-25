import { createElement } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";

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
  return /*#__PURE__*/ createElement(
    Container,
    null,
    createElement(
      InputLabel,
      null,
      createElement(Checkbox, {
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
