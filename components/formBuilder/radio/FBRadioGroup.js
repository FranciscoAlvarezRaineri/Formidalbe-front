import { createElement } from "react";
import FBRadioButton from "./FBRadioButton";

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
