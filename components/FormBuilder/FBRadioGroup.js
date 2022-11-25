import { useState, createElement } from "react";
import { Radio, InputLabel } from "@material-ui/core";

function FBRadioButton(props) {
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

export default function FBRadioGroup(props) {
  const {
    options,
    defaultValue,
    onChange,
    horizontal,
    id,
    autoFocus,
    disabled,
  } = props;
  const name = Math.random().toString();
  return createElement(
    "div",
    {
      id: id,
      className: "fb-radio-group",
    },
    options.map((option, index) =>
      createElement(FBRadioButton, {
        value: option.value,
        label: option.label,
        id: id,
        name: name,
        key: option.value,
        checked: option.value === defaultValue,
        autoFocus: autoFocus && index === 1,
        onChange: onChange,
        disabled: disabled,
      })
    )
  );
}
