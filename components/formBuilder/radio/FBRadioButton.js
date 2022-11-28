import { useState, createElement } from "react";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";

export default function FBRadioButton(props) {
  const {
    label,
    value,
    checked,
    name,
    onChange,
    required,
    disabled,
    autoFocus,
  } = props;
  const [id] = useState(`radio-${Math.floor(Math.random() * 1000000)}`);
  return createElement(
    "div",
    {
      className: "fb-radio-button",
      key: value,
    },
    createElement(Radio, {
      id: id,
      name: name,
      value: value,
      checked: checked,
      required: required,
      disabled: disabled,
      autoFocus: autoFocus,
      onChange: () => onChange(value),
    }),
    createElement(
      InputLabel,
      {
        htmlFor: id,
      },
      label
    )
  );
}
