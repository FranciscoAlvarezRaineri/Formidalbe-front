import { createElement } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
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
  const useStyles = makeStyles((theme) => ({
        root: {color:'#0097d1',    
     },
    }
    ));
  const classes = useStyles();

  return createElement(
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
        className: classes.root
      }),
      label
    )
  );
}
